import { EventEmitter, Output, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';

export abstract class AbstractReactiveForm implements OnDestroy, OnInit {
  formGroup: FormGroup;
  formGroupValuesChanges: Subscription;

  value = {};
  @Output() onChangeCallback: EventEmitter<any>;
  @Output() onSubmitValue: EventEmitter<any>;

  debounceTime = 300;

  patchOptions = { emitEvent: false };

  ngOnDestroy() {
    if (this.formGroupValuesChanges) {
      this.formGroupValuesChanges.unsubscribe();
    }
  }

  ngOnInit() {
    const patch = Object.keys(this.formGroup.controls).reduce(
      this.getFormGroupValuesReducer(), {});

    this.formGroup.patchValue(patch, this.patchOptions);

    this.formGroupValuesChanges = this.formGroup.valueChanges
    .debounceTime(this.debounceTime)
    .subscribe(() => {
      this.onChangeCallback.emit(this.getAggregatedValue());
    });
  }

  getFormGroupValuesReducer() {
    return (acc: Object, field: string) => {
      acc[field] = this.value[field];

      return acc;
    };
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.onSubmitValue.emit(this.getAggregatedValue());
    }
  }

  getAggregatedValue() {
    return {
      ...this.value,
      ...this.formGroup.value,
    };
  }
}

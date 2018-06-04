import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ng-demo-demo-form',
  templateUrl: './demo-form.component.html',
  styleUrls: ['./demo-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

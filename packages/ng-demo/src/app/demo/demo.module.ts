import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoContainerComponent } from './containers/demo-container/demo-container.component';
import { DemoFormComponent } from './components/demo-form/demo-form.component';
import { DemoGuard } from './guards/demo.guard';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DemoContainerComponent, DemoFormComponent],
  providers: [DemoGuard]
})
export class DemoModule { }

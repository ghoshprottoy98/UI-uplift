import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormlyMatFormFieldModule} from '@ngx-formly/material/form-field';
import {FormlyModule} from '@ngx-formly/core';
import {TimepickerTypeComponent} from './timepicker-type.component';
import {NgbTimepickerModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    TimepickerTypeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    FormlyMatFormFieldModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'timepicker',
          component: TimepickerTypeComponent,
          extends: 'input',
          wrappers: ['form-field'],
        },
      ],
    }),
    NgbTimepickerModule,
  ],
})
export class TimepickerModule { }

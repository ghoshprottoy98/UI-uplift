import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {FormlyMatFormFieldModule} from '@ngx-formly/material/form-field';
import {FormlyModule} from '@ngx-formly/core';
import {DateRangeTypeComponent} from './date-range-type.component';
import {DateRangeInputModule} from '../../date-range-input/date-range-input.module';

@NgModule({
  declarations: [
    DateRangeTypeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyMatFormFieldModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'date-range',
          component: DateRangeTypeComponent,
        },
      ],
    }),
    DateRangeInputModule,
  ]
})
export class DateRangeModule { }

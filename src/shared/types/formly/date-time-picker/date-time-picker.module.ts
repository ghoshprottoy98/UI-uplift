import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DateTimePickerComponent} from './date-time-picker.component';
import {ReactiveFormsModule} from "@angular/forms";
import {FormlyMatFormFieldModule} from "@ngx-formly/material/form-field";
import {FormlyModule} from "@ngx-formly/core";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from "@angular-material-components/datetime-picker";


@NgModule({
  declarations: [
    DateTimePickerComponent
  ],
  imports: [
    CommonModule,
    CommonModule,
    ReactiveFormsModule,
    FormlyMatFormFieldModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'date-time',
          component: DateTimePickerComponent,
        },
      ],
    }),
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
  ]
})
export class DateTimePickerModule { }

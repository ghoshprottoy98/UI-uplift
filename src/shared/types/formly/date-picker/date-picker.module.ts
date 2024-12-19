import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DatePickerComponent} from './date-picker.component';
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
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {DateFnsAdapter} from "@angular/material-date-fns-adapter";
import {enUS} from "date-fns/locale";


export const CUSTOM_DATE_FORMATS = {
  display: {
    dateInput: 'dd-MM-yyyy',
    monthYearLabel: 'MMM yyyy',
    dateA11yLabel: 'dd-MM-yyyy',
    monthYearA11yLabel: 'MMMM yyyy',
  },
};


@NgModule({
  declarations: [
    DatePickerComponent
  ],
  imports: [
    CommonModule,
    CommonModule,
    ReactiveFormsModule,
    FormlyMatFormFieldModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'date-picker',
          component: DatePickerComponent,
        },
      ],
    }),

    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
  ],
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      useValue: enUS,
    },
    {provide: DateAdapter, useClass: DateFnsAdapter, deps: [MAT_DATE_LOCALE]},
    {
      provide:
      MAT_DATE_FORMATS, useValue:
      CUSTOM_DATE_FORMATS
    },
  ]
})
export class DatePickerModule {
}

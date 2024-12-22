import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DateRangeInputComponent} from './date-range-input.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDateFnsModule} from "@angular/material-date-fns-adapter";


@NgModule({
  declarations: [
    DateRangeInputComponent
  ],
  exports: [
    DateRangeInputComponent
  ],
  imports: [
    CommonModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDateFnsModule
  ],
})
export class DateRangeInputModule {
}

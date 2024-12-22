import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from '@angular/forms';
import {Subscription} from 'rxjs';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {DateFnsAdapter} from "@angular/material-date-fns-adapter";

const MY_FORMATS = {
  parse: {
    dateInput: 'PP',
  },
  display: {
    dateInput: 'PP',
    monthYearLabel: 'mm yyyy',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'mm yyyy',
  },
};

@Component({
  selector: 'app-date-range-input',
  template: `

    <mat-form-field>
      <mat-label>{{placeholder}}</mat-label>
      <mat-date-range-input [min]="minDate" [max]="maxDate" [formGroup]="range" [rangePicker]="picker">
        <input matStartDate formControlName="start" placeholder="Start date">
        <input matEndDate formControlName="end" placeholder="End date">
      </mat-date-range-input>
      <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
      <mat-date-range-picker #picker></mat-date-range-picker>

      <mat-error *ngIf="range.controls.end.hasError('required') || range.controls.start.hasError('required')">
        Valid date input required
      </mat-error>
    </mat-form-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: DateRangeInputComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: DateRangeInputComponent
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class DateRangeInputComponent implements ControlValueAccessor, Validator, OnInit, OnDestroy {

  @Input() startPlaceholder = 'Start date';
  @Input() endPlaceholder = 'End date';
  @Input() placeholder = 'Enter a date range';
  @Input() appearance = 'outline';
  @Input() required = false;
  @Input() format: any;
  @Input() maxRange: any;

  private minValue: any;
  private maxValue: any;
  private min: any;
  private max: any;

  @Input() set minDate(date) {
    this.minValue = this.min = date;
  }

  get minDate() {
    return this.min;
  }

  @Input() set maxDate(date) {
    this.maxValue = this.max = date;
  }

  get maxDate() {
    return this.max;
  }

  @Input() defaultModel = {start: null, end: null};

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  onChangeSubs: Subscription[] = [];
  touched = false;

  onTouched = () => {
  }

  constructor() {
  }

  ngOnInit(): void {
  }

  dateFilter(): boolean {
    return false;
  }

  writeValue(value: any) {
    if (!value) {
      value = this.defaultModel;
    }
    if (value) {
      this.range.setValue(value, {emitEvent: false});
    }
  }

  registerOnChange(onChange: any) {
    const sub = this.range.valueChanges.subscribe((v) => {
      if (!this.format) {
        return onChange(v);
      }

      const startDate = this.range.controls.start.value;
      const endDate = this.range.controls.end.value;
      onChange({
        start: startDate ? startDate : null,
        end: endDate ? endDate : null,
      });
    });
    this.onChangeSubs.push(sub);
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(disabled: boolean) {
    if (disabled) {
      this.range.disable();
    } else {
      this.range.enable();
    }
  }

  addControlErrors(allErrors: any, controlName: string) {

    const errors = {...allErrors};

    const control = this.range.get(controlName) as FormControl | null;

    if (control && control.errors) {
      errors[controlName] = control.errors;
    }

    return errors;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (this.range.valid) {
      return null;
    }

    let errors: any = {};

    errors = this.addControlErrors(errors, 'start');
    errors = this.addControlErrors(errors, 'end');

    return errors;
  }

  ngOnDestroy() {
    for (const sub of this.onChangeSubs) {
      sub.unsubscribe();
    }
  }
}

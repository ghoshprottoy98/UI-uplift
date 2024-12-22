import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FieldType} from "@ngx-formly/material";
import {FieldTypeConfig} from "@ngx-formly/core";
import {format} from "date-fns";

@Component({
  selector: 'app-date-time-picker',
  template: `
    <mat-form-field class="col-12">
      <mat-label>{{ props.label }}</mat-label>
      <input [formControl]="formControl" [matDatepicker]="picker" [max]="getMaxDate(props['maxDate'])"
             [min]="getMinDate(props['minDate'])"
                 readonly="{{props.readonly}}"
             matInput placeholder="{{props.placeholder}}" required="{{props.required}}">
      <mat-datepicker-toggle [disabled]='props.readonly' [for]="$any(picker)" matSuffix></mat-datepicker-toggle>
      <mat-datepicker #picker
                      [color]="props['color'] ? props['color'] : 'primary'"
                      [touchUi]="props['touchUi']">
        <ng-template>
          <span>OK</span>
        </ng-template>
      </mat-datepicker>
      <mat-error *ngIf="formControl.hasError('required')">
        This field is required
      </mat-error>
      <mat-error *ngIf="!formControl.hasError('required') && formControl.hasError('toDate')">
        End Date can not be less or equal to Start Date
      </mat-error>
      <mat-error *ngIf="!formControl.hasError('required') && formControl.errors && !formControl.hasError('toDate')">
        {{ checkMs() }}
      </mat-error>
    </mat-form-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerComponent extends FieldType<FieldTypeConfig> implements OnInit {

  override defaultOptions = {
    templateOptions: {
      required: false,
        readOnly: true,
      placeholder: 'Choose date & time',
      appearance: 'outline',
    },
  };

  ngOnInit() {
    this.formControl.valueChanges.subscribe((value) => {
      if (value) {
        const formattedDate = format(new Date(value), 'yyyy-MM-dd');
        this.formControl.setValue(formattedDate, {emitEvent: false});
      }
    });
  }

  getMinDate(minDate: any) {
    if (minDate) {
      let date = new Date(minDate);
      date.setDate(date.getDate());
      return date;
    }
    return minDate;
  }

  getMaxDate(maxDate: any) {
    if (maxDate) {
      let date = new Date(maxDate);
      date.setDate(date.getDate());
      return date;
    }
    return maxDate;
  }

  checkMs() {
    const errorKeys = Object.keys(this.formControl.errors || {});
    if (errorKeys.length > 0) {
      const validatorKey = errorKeys[0];
      if (validatorKey === "matDatepickerMin") {
        return "Date can not be less than today";
      } else if (validatorKey === "matDatepickerMax") {
        return "Date can not be greater"
      } else (this.form.get(`${this.field.key}`)?.hasError(validatorKey))
      {
        let error = this.form.get(`${this.field.key}`)?.getError(validatorKey);
        if (typeof error?.message === 'function') {
          return error.message('', this.field);
        } else if (typeof error?.message === 'string') {
          return error.message;
        } else {
          return null;
        }

      }
    }
    return null;
  }
}

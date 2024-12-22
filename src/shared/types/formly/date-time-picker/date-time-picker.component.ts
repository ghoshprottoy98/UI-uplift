import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FieldType} from "@ngx-formly/material";
import {FieldTypeConfig} from "@ngx-formly/core";

@Component({
  selector: 'app-date-time-picker',
  template: `
    <mat-form-field class="col-12">
      <mat-label>{{props.label}}</mat-label>
      <input matInput [ngxMatDatetimePicker]="picker" placeholder="{{props.placeholder}}" [formControl]="formControl"
             [min]="getMinDate(props['minDate'])" [max]="props['maxDate']" [readonly]="true" required = "{{props['required']}}">
      <mat-datepicker-toggle matSuffix [for]="$any(picker)"></mat-datepicker-toggle>
      <ngx-mat-datetime-picker #picker [showSpinners]="props['showSpinners']"
                               [showSeconds]="props['showSeconds']"
                               [stepHour]="props['stepHour']"
                               [stepMinute]="props['stepMinute']"
                               [stepSecond]="props['stepSecond']"
                               [touchUi]="props['touchUi']"
                               [color]="props['color'] ? props['color'] : 'primary'"
                               [enableMeridian]="props['enableMeridian']"
                               [disableMinute]="props['disableMinute']"
                               [hideTime]="props['hideTime']">
        <!-- Custom icon or text of Apply icon -->
        <ng-template>
          <!-- <mat-icon>star</mat-icon> -->
          <span>OK</span>
        </ng-template>
      </ngx-mat-datetime-picker>
      <mat-error *ngIf="formControl.hasError('required')">
        {{props['validationMessage']}}
      </mat-error>
      <mat-error *ngIf="!formControl.hasError('required') && formControl.hasError(props['validator'])">
        {{checkMs(props['validator'])}}
      </mat-error>
      <mat-error *ngIf="!formControl.hasError('required') && formControl.hasError('matDatetimePickerMin')">
        Can't select previous date and time
      </mat-error>
    </mat-form-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateTimePickerComponent extends FieldType<FieldTypeConfig> {

  override defaultOptions = {
    templateOptions: {
      required: false,
      placeholder: 'Choose date & time',
      appearance: 'outline',
    },
  };

  getMinDate(minDate: any) {
    if (minDate) {
      let date = new Date();
      date.setDate(date.getDate());
      return date;
    }
    return minDate;
  }

  checkMs(validator: any) {
    if (this.form.get(`${this.field.key}`)?.hasError(validator)) {
      return this.form.get(`${this.field.key}`)?.getError(validator)
        .message('', this.field);
    }
  }
}

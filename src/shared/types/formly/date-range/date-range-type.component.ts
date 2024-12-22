import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FieldType} from '@ngx-formly/material';
import {FieldTypeConfig} from "@ngx-formly/core";

@Component({
  selector: 'app-formly-date-range',
  template: `
    <app-date-range-input
        [id]="id"
        [formControl]="formControl"
        [formlyAttributes]="field"
        [tabIndex]="props.tabindex"
        [required]="props.required!"
        [startPlaceholder]="props['startPlaceholder']"
        [endPlaceholder]="props['endPlaceholder']"
        [placeholder]="placeholder"
        [appearance]="props['appearance!']"
        [minDate]="props['minDate']"
        [maxDate]="props['maxDate']"
        [format]="props['format']"
        [maxRange]="props['maxRange']"
        [defaultModel]="props['defaultValue']"
    ></app-date-range-input>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateRangeTypeComponent extends FieldType<FieldTypeConfig> {
  override defaultOptions = {
    templateOptions: {
      required: false,
      startPlaceholder: 'Start date',
      endPlaceholder: 'End date',
      appearance: 'outline',
      format: 'YYYY-MM-DD'
    },
  };
}

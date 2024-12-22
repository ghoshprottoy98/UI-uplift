import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {FieldType} from '@ngx-formly/material';
import {NgbTimeAdapter, NgbTimepicker} from '@ng-bootstrap/ng-bootstrap';
import {NgbTimeStringAdapter} from './timepicker-adapter';
import {FieldTypeConfig} from "@ngx-formly/core";

@Component({
    selector: 'app-formly-field-mat-timepicker',
    template: `
        <ngb-timepicker
                [id]="id"
                [formControl]="formControl"
                [formlyAttributes]="field"
                [tabIndex]="props.tabindex"
                [required]="!!props.required"
                [meridian]="props['meridian']"
        ></ngb-timepicker>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{provide: NgbTimeAdapter, useClass: NgbTimeStringAdapter}]
})
export class TimepickerTypeComponent extends FieldType<FieldTypeConfig> {
    @ViewChild(NgbTimepicker, {static: true}) timePicker!: NgbTimepicker;
    override defaultOptions = {
      props: {
            hideFieldUnderline: true,
            floatLabel: 'always' as const,
            hideLabel: false,
            labelPosition: 'before',
            meridian: true,
            required: false
        },
    };

    override onContainerClick(event: MouseEvent): void {
        super.onContainerClick(event);
    }
}

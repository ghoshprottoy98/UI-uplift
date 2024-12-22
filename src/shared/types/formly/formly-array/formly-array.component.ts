import { Component } from '@angular/core';
import {FieldArrayType} from "@ngx-formly/core";

@Component({
  selector: 'app-formly-array',
  template: `
    <div
      *ngFor="let field of field.fieldGroup; let i = index;">
      <formly-field [field]="field"></formly-field>
    </div>
  `,
})
export class FormlyArrayComponent extends FieldArrayType {
}

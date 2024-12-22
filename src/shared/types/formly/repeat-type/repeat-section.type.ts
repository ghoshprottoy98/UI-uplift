import { Component } from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';

@Component({
  selector: 'app-repeat-section-type',
  template: `
    <div *ngFor="let field of field.fieldGroup; let i = index;" class="row">
      <formly-field class="col" [field]="field"></formly-field>
    </div>
  `,
})
export class RepeatTypeComponent extends FieldArrayType {}

import {Component} from '@angular/core';
import {FieldArrayType} from '@ngx-formly/core';
import {Subject} from 'rxjs';
import {AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-formly-document-check',
  template: `
    <div *ngFor="let field of field.fieldGroup; let i = index;" class="row">
      <formly-field class="col-12" [field]="field"></formly-field>
    </div>
  `,
})
export class DocumentCheckTypeComponent extends FieldArrayType {
}

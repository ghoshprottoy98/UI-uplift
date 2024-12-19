import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {FormlyModule} from '@ngx-formly/core';
import {NgSelectModule} from '@ng-select/ng-select';
import {DocumentCheckTypeComponent} from "./document-check-type";

@NgModule({
  declarations: [
    DocumentCheckTypeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'document-check',
          component: DocumentCheckTypeComponent,
        },
      ],
    })
  ]
})
export class DocumentCheckTypeModule { }

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ReactiveFormsModule} from '@angular/forms';
import {FormlyMatFormFieldModule} from '@ngx-formly/material/form-field';
import {FormlyModule} from '@ngx-formly/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatListModule} from '@angular/material/list';
import {SearchableSelectTypeComponent} from "./searchable-select-type";
import {MatSelectModule} from "@angular/material/select";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";


@NgModule({
  declarations: [SearchableSelectTypeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyMatFormFieldModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'searchableSelect',
          component: SearchableSelectTypeComponent,
        },
      ],
    }),
    MatFormFieldModule,
    MatListModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
  ]
})
export class SearchableSelectTypeModule {
}

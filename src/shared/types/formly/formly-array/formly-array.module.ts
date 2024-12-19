import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormlyArrayComponent} from './formly-array.component';
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {FormlyModule} from "@ngx-formly/core";


@NgModule({
  declarations: [
    FormlyArrayComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({
      types: [{name: 'array', component: FormlyArrayComponent}],
    }),
  ]
})
export class FormlyArrayModule { }

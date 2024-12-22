import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EasySelectTypeComponent } from './easy-select-type.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FormlyModule} from '@ngx-formly/core';
import {NgSelectModule} from '@ng-select/ng-select';

@NgModule({
  declarations: [
    EasySelectTypeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'easy-select',
          component: EasySelectTypeComponent,
        },
      ],
    }),
  ]
})
export class EasySelectModule { }

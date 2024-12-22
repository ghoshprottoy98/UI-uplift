import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {FormlyModule} from '@ngx-formly/core';
import {RepeatTypeComponent} from "./repeat-section.type";
// import {SharedModule} from "../../../../_metronic/shared/shared.module";

@NgModule({
  declarations: [
    RepeatTypeComponent
  ],
  exports: [
    RepeatTypeComponent
  ],
  imports: [
    CommonModule,
    // SharedModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({
      types: [{name: 'repeat', component: RepeatTypeComponent}],
    }),
  ]
})
export class RepeatSectionTypeModule {
}

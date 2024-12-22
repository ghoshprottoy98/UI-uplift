import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {FormlyModule} from '@ngx-formly/core';
import {MatInputModule} from "@angular/material/input";
import {InlineSVGModule} from "ng-inline-svg-2";
// import {FileInputModule} from "../../../components/file-input/file-input.module";
import {FileInputTypeComponent} from "./file-input-type.component";

@NgModule({
  declarations: [
    FileInputTypeComponent
  ],
  exports: [
    FileInputTypeComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({
      types: [{name: 'file', component: FileInputTypeComponent}],
    }),
    InlineSVGModule,
    // FileInputModule,
  ]
})
export class FileInputTypeModule {
}

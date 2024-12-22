import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormlyModule} from '@ngx-formly/core';
import {FileDragDropUploaderComponent} from './file-dragdrop-uploader.component';
import {ReactiveFormsModule} from '@angular/forms';
import {UppyDashboardModule} from "@bracit/angular/uppy";

@NgModule({
  declarations: [
    FileDragDropUploaderComponent
  ],
  imports: [
    CommonModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'multiFileUploader',
          component: FileDragDropUploaderComponent,
        },
      ],
    }),
    UppyDashboardModule,
    ReactiveFormsModule
  ]
})
export class FileDragdropUploaderModule {
}

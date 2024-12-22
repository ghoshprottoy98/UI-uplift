import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FieldType} from '@ngx-formly/material';
import {BehaviorSubject} from 'rxjs';
import {FieldTypeConfig} from "@ngx-formly/core";
import {NotificationService} from "../../../services/notification.service";

@Component({
  selector: 'app-file-dragdrop-uploader-component',
  template: `
    <app-uppy-dashboard
      (existingFileRemoved)="props['existingFileRemove($event)']"
      (fileAdded)="props['fileAdded($event)']"
      (fileRemoved)="props['fileRemoved($event)']"
      (beforeFileAddedAction)="props['onBeforeFileAdd($event)']"
      [camModes]="props['camModes']"
      [config]="props['config']"
      [enableEditor]="props['enableEditor']"
      [enableScreenCapture]="props['enableScreenCapture']"
      [enableWebcam]="props['enableWebcam']"
      [files]="props['files']"
      [formControl]="formControl"
      [formlyAttributes]="field"
      [id]="id"
      [multiple]="props['multiple']"
      [notifier]="notifier"
      [removalConfirmation]="props['removalConfirmation']"
      [required]="!!props.required"
      [tabIndex]="props.tabindex"
    ></app-uppy-dashboard>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileDragDropUploaderComponent extends FieldType<FieldTypeConfig> {
  override defaultOptions = {
    props: {
      fileAdded: () => {
      },
      fileRemoved: () => {
      },
      existingFileRemove: () => {
      },
      multiple: false,
      enableWebcam: false,
      camModes: ['picture'],
      files: new BehaviorSubject([]).asObservable(),
      enableScreenCapture: false,
      enableEditor: false,
      removalConfirmation: 'Are you sure to remove the file?',
      config: {
        showRemoveButtonAfterComplete: true,
        showLinkToFileUploadResult: true,
        locale: {
          dropPasteImportFiles: 'Drag & drop or paste files here or import from:',
          xFilesSelected: {
            0: '',
            1: ''
          },
        }
      }
    }
  };

  constructor(public notifier: NotificationService) {
    super();
  }


}



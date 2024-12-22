import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {NotificationService} from "../../../services/notification.service";
// import {fileSizeValidationMsg, formatFileName, sizeWithUnit} from "../../../util/utils";

@Component({
  selector: 'app-input-type-file',
  template: `
    <div>
      <div class="d-flex flex-column">
        <div class="m-1" *ngIf="showLabel">
          <span class="fs-6">{{ label }}:<span class="text-danger"
                                               *ngIf="isRequired">*</span></span>
        </div>

        <input [accept]="accept" class="d-none" [disabled]="disableStat" type="file" #fileInput
        (change)="onChange($event)">

        <div class="d-flex border border-1 rounded-1 border-gray-500 mb-3">
          <div class="d-flex flex-row border-end border-1 border-gray-500 bg-gray-200 px-2"
               [ngClass]="showLabel ? 'py-3' : 'py-4'"
               (click)="fileInput.click()">
            <div class="d-flex align-items-center me-1">
              <i class="ki-duotone ki-{{iconName}} fs-3 {{iconColor}}"> <span class="path1"></span> <span
                class="path2"></span></i>
            </div>
            <div class="d-flex align-items-center" *ngIf="uploadText">
              <label> {{ uploadText }} </label>
            </div>
          </div>

          <div class="d-flex felx-row-1 align-items-center mx-2"
               *ngIf="showFileName && fileName">
            <label> {{ fileName }} <i
              *ngIf="showRemoveBtn"
              class="fa-solid fa-times-circle fs-4 text-danger cursor-pointer"
              title="Clear"
              (click)="remove()"></i> </label>
          </div>
        </div>
      </div>
      <ng-content></ng-content>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: FileInputComponent,
    }
  ],
  styles: [''],
})
export class FileInputComponent implements ControlValueAccessor {

  @ViewChild('fileInput', {static: true}) fileInput: { nativeElement: { value: string | null; }; } | undefined;
  @Input() tabIndex: any;
  @Input() accept: string | undefined;
  @Input() showPreview = true;
  @Input() maxFileSize = 10485760;
  @Input() label?: string;
  @Input() showLabel: boolean | undefined;
  @Input() showFileName: boolean | undefined;
  @Input() iconName: string | undefined;
  @Input() iconColor: string | undefined;
  @Input() uploadText: string | undefined;
  @Input() showRemoveBtn: boolean | undefined;
  @Input() isRequired: boolean | undefined;
  @Input() fileName: string | undefined;
  @Input() formControl: any;

  @Output() fileSelected = new EventEmitter();
  selected: any;
  preview: string | null | undefined;
  disableStat: boolean | undefined;

  constructor(private notify: NotificationService) {
  }

  propagateChange = (_: any) => {
  }

  writeValue(obj: any): void {
    if (this.fileInput) {
      this.fileInput.nativeElement.value = null;
    }
    this.selected = obj;
    this.updateImageUrl();
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disableStat = isDisabled;
  }

  private onTouched: Function = () => {};

  onChange(event: Event | null) {
    const inputElement = event?.target as HTMLInputElement;
  
    if (inputElement?.files && inputElement.files[0]) {
      const file = inputElement.files[0];
  
      if (file.size > this.maxFileSize) {
        const fileSize = sizeWithUnit(this.maxFileSize);
        this.notify.warning(fileSizeValidationMsg(fileSize));
      } else {
        this.selected = file;
        this.updateImageUrl();
        this.propagateChange(this.selected);
        this.fileSelected.emit(this.selected);
      }
    }
  }
  

  isImage(type?: string) {
    return type && type.startsWith('image/');
  }

  updateImageUrl() {
    if (this.selected && this.selected.hasOwnProperty('File')) {
      const selectedFileType = this.selected.name.split('.').pop().toLowerCase();

      if (this.accept && !this.accept.split(',').includes(`.${selectedFileType}`)) {
        this.selected = null;
        this.notify.warning('Only "' + this.accept + '" types are allowed');
        return;
      }
      if (this.selected.size > this.maxFileSize) {
        this.selected = null;
        const fileSize = sizeWithUnit(this.maxFileSize);
        this.notify.warning(fileSizeValidationMsg(fileSize));
        return;
      }
    }

    if (this.isImage(this.selected?.type)) {
      this.preview = URL.createObjectURL(this.selected);
    } else {
      this.preview = 'assets/media/misc/selected-file.svg';
    }

    if (this.selected?.name) {
      this.setFileName(this.selected?.name);
    }

    if (this.selected?.fileName) {
      this.setFileName(this.selected?.fileName);
    }
  }

  private setFileName(name: string) {
    this.fileName = formatFileName(name);
  }

  remove() {
    this.fileName = '';
    this.selected = null;
    this.preview = null;

    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
    this.propagateChange(null);

    if (this.isRequired) {
      this.formControl.setValidators([Validators.required]);
      this.formControl.updateValueAndValidity();
    }
  }
}
function sizeWithUnit(maxFileSize: number) {
  throw new Error('Function not implemented.');
}

function fileSizeValidationMsg(fileSize: any): string {
  throw new Error('Function not implemented.');
}

function formatFileName(name: string): string {
  throw new Error('Function not implemented.');
}


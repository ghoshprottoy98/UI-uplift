import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FieldType, FieldTypeConfig} from '@ngx-formly/core';
import {BehaviorSubject} from "rxjs";
import {FileInputComponent} from "./file-input.component";
// import {formatFileName} from "../../../util/utils";

@Component({
  selector: 'app-file-type',
  template: `
    <app-input-type-file
      [id]="id"
      [formControl]="formControl"
      [formlyAttributes]="field"
      [tabIndex]="props.tabindex"
      [showPreview]="props['showPreview']"
      [accept]="props['accept']"
      [iconName]="props['iconName']"
      [iconColor]="props['iconColor']"
      [maxFileSize]="props['maxFileSize']"
      [label]="props.label"
      [fileName]="props['file']"
      [showLabel]="props['showLabel']"
      [showFileName]="props['showFileName']"
      [uploadText]="props['uploadText']"
      [showRemoveBtn]="props['showRemoveBtn']"
      [isRequired]="props.required"
      (fileSelected)="props['fileAdded($event)']"
    />
  `,
})
export class FileTypeComponent extends FieldType<FieldTypeConfig> implements OnInit, AfterViewInit {

  @ViewChild(FileInputComponent) childComponent!: FileInputComponent;

  get label() {
    return this.props.label ? this.props.label : 'Upload File';
  }

  constructor(private cdr: ChangeDetectorRef) {
    super();
  }

  override defaultOptions = {
    props: {
      type: 'file',
      iconColor: '',
      iconName: 'magnifier',
      uploadText: 'Browse',
      showFileName: true,
      showLabel: true,
      showRemoveBtn: true,
      showPreview: true,
      clearFile: new BehaviorSubject(false),
      fileAdded: (event: any) => event,
      existingFile: null
    }
  };

  ngOnInit(): void {
    this.props['clearFile'].subscribe((res: any) => {
      if (res) {
        this.childComponent.remove();
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.formControl && this.props['existingFile']) {
      if (this.props['existingFile']?.clientName) {
        this.props['file'] = formatFileName(this.props['existingFile']?.clientName);
        this.cdr.detectChanges();
      }

      if (this.props.required) {
        this.childComponent.onChange(null);
        this.formControl.setValidators([]);
        this.formControl.updateValueAndValidity();
      }
    }
  }
}
function formatFileName(clientName: any): any {
  throw new Error('Function not implemented.');
}


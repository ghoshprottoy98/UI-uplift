import {Component} from '@angular/core';
import {FieldType, FieldTypeConfig} from '@ngx-formly/core';

@Component({
  selector: 'app-file-type',
  template: `
    <!-- <app-file-input
      [id]="id"
      [formControl]="formControl"
      [formlyAttributes]="field"
      [tabIndex]="props.tabindex"
      [showPreview]="props.showPreview"
      [accept]="props.accept"
      [btnClass]="props.btnClass"
      [selectedClass]="'btn-primary text-white'"
      [maxFileSize]="props.maxFileSize"

    >
      <i class="fa-regular fa-file"></i>
      {{label}}
    </app-file-input> -->
  `,
})
export class FileInputTypeComponent extends FieldType<FieldTypeConfig> {
  get label() {
    return this.props.label ? this.props.label : 'Choose File To Upload';
  }

  override defaultOptions = {
    props: {
      type: 'file',
      btnClass: 'btn-light color-primary'
    },
  };
}

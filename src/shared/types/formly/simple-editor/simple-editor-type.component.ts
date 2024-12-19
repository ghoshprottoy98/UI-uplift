import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FieldType} from '@ngx-formly/material';
import * as ClassicEditor from '@bracit/simple-ckeditor5';
import { AuthService } from '../../../services/auth-service';
// import {environment} from '../../../../../environments/environment';
import {FieldTypeConfig} from "@ngx-formly/core";

@Component({
  selector: 'app-simple-editor',
  template: `
    <div class="editor-container">
      <ckeditor
        [id]="id"
        [formControl]="formControl"
        [formlyAttributes]="field"
        [editor]="Editor"
        [config]="props.config"
        [data]="props.data"
        (ready)="onReady($event)"
      ></ckeditor>
    </div>
  `,
  styleUrls: ['./simple-editor-type.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleEditorTypeComponent extends FieldType<FieldTypeConfig> implements OnInit {
  readonly UPLOAD_URL = environment.apiUrl + '/data/ckeditor/upload/';
  public Editor = ClassicEditor;
  defaultOptions = {
    templateOptions: {
      pathSuffix: 'common',
      data: '',
      placeholder: '',
      height: '250px',
      config: {
        fontFamily: {
          options: [
            'default',
            'Arial, Helvetica, sans-serif',
            'Courier New, Courier, monospace',
            'Georgia, serif',
            'Lucida Sans Unicode, Lucida Grande, sans-serif',
            'Tahoma, Geneva, sans-serif',
            'Times New Roman, Times, serif',
            'Trebuchet MS, Helvetica, sans-serif',
            'Verdana, Geneva, sans-serif',
            'SolaimanLipi',
            'Inter'
          ],
          supportAllValues: true
        },
        fontSize: {
          options: [
            9,
            11,
            13,
            'default',
            17,
            19,
            21
          ]
        },
        toolbar: [
          'bold', 'italic', 'underline',
          '|',
          'alignment', 'numberedList', 'bulletedList',
          '|',
          'insertTable', 'link',
          '|',
          'undo', 'redo'
        ],
        simpleUpload: {
          uploadUrl: '',
          headers: () => {
            return new Promise(resolve => {
              this.auth.getToken().then(token => {
                resolve({
                  Authorization: 'Bearer ' + token
                });
              });
            });
          }
        },
        image: {
          styles: [
            'alignLeft', 'alignCenter', 'alignRight'
          ],
          resizeOptions: [
            {
              name: 'resizeImage:original',
              label: 'Original',
              value: null
            },
            {
              name: 'resizeImage:50',
              label: '50%',
              value: '50'
            },
            {
              name: 'resizeImage:75',
              label: '75%',
              value: '75'
            }
          ],
          toolbar: [
            'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight',
            '|',
            'resizeImage',
            '|',
            'imageTextAlternative'
          ]
        }
      }
    },
  };

  constructor(private auth: AuthService) {
    super();
  }

  public ngOnInit() {
    this.props.config.simpleUpload.uploadUrl = this.UPLOAD_URL + this.props.pathSuffix;
  }

  public onReady(editor) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement().nextSibling
    );
    editor.editing.view.change(writer => {
      writer.setStyle('height', this.props.height, editor.editing.view.document.getRoot());
    });
  }
}

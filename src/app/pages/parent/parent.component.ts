import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FormlyFieldConfig, FormlyFormOptions} from "@ngx-formly/core";



@Component({
    selector: 'app-version',
    styleUrls: ['./parent.component.scss'],
    templateUrl: './parent.component.html'
})
export class ParentComponent implements OnInit{
  form = new FormGroup({});
  options: FormlyFormOptions = {};
  // @ts-ignore
  fields: FormlyFieldConfig[] =  [
    {
      key: 'text',
      type: 'input',
      className: '',
      props: {
        label: 'Text',
        placeholder: 'Formly is terrific!',
        required: true,
      },
    },
    {
      key: 'nested.story',
      type: 'textarea',
      props: {
        label: 'Some sweet story',
        placeholder: 'It allows you to build and maintain your forms with the ease of JavaScript :-)',
        description: '',
      },
    },
    ]



    constructor() {

    }

  ngOnInit(): void {

  }


}

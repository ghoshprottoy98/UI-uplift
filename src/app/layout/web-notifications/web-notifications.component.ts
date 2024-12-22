import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import {TitleBarService} from "../components/tittle-bar/title-bar.service";

@Component({
  selector: 'app-web-notifications',
  templateUrl: './web-notifications.component.html',
  styleUrl: './web-notifications.component.css'
})
export class WebNotificationsComponent {

  model: any = {};
  form = new FormGroup({});
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'text',
      type: 'input',
      className:'',
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
      expressions: {
        focus: 'formState.awesomeIsForced',
        'props.description': ({ options: { formState } }: any) => {
          if (formState.awesomeIsForced) {
            return 'And look! This field magically got focus!';
          }

          return '';
        },
      },
    },
    {
      key: 'awesome',
      type: 'checkbox',
      props: { label: '' },
      expressions: {
        'props.disabled': 'formState.awesomeIsForced',
        'props.label': ({ options: { formState }}: any) => {
          if (formState.awesomeIsForced) {
            return 'Too bad, formly is really awesome...';
          } else {
            return 'Is formly totally awesome? (uncheck this and see what happens)';
          }
        },
      },
    },
    {
      key: 'whyNot',
      type: 'textarea',
      props: {
        label: 'Why Not?',
        placeholder: 'Type in here... I dare you',
      },
      expressions: {
        hide: 'model.awesome',
        'props.placeholder': ({ options: { formState } }: any) => {
          if (formState.awesomeIsForced) {
            return `Too bad... It really is awesome! Wasn't that cool?`;
          } else {
            return 'Type in here... I dare you';
          }
        },
        'props.disabled': 'formState.awesomeIsForced',
      },
    },
    {
      fieldGroupClassName: 'row ',
      fieldGroup: [
        {
          className: 'col-sm-12 col-md-12 col-xl-12',
          key: 'Date',
          type: 'date-picker',
          props: {
            label: 'Date',
            placeholder: 'Date',
            required: true,
            minDate: new Date(),
          }
        },

      ]
    },
  ];

  constructor(private  service: TitleBarService) {
    this.service.setTitle('Change Component Title');
  }

}

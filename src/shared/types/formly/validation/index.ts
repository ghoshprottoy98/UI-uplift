import {
  maxlengthValidationMessage,
  maxValidationMessage,
  minlengthValidationMessage,
  minValidationMessage
} from './messages';

export const commonValidationMessages = [
  {name: 'required', message: 'This field is required'},
  {name: 'minLength', message: minlengthValidationMessage},
  {name: 'maxLength', message: maxlengthValidationMessage},
  {name: 'mask', message: 'Please enter the value in the required format.'},
  {name: 'min', message: minValidationMessage},
  {name: 'max', message: maxValidationMessage},
  {name: 'noSpace', message: "Please remove any trailing or leading whitespace"},
];

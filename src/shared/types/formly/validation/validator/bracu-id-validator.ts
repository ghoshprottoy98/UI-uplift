import {AbstractControl, ValidationErrors} from "@angular/forms";
import { FormlyFieldConfig } from '@ngx-formly/core';

export function BracuIdValidator(c: AbstractControl, field: FormlyFieldConfig): ValidationErrors | null {
  const input = c.value;

  if (field.model?.isBracuStudent === 1 && !input) {
    return {bracuRequired: true};
  }

  if (input && !/^\d+$/.test(input)) {
    return {bracuInvalid: true};
  }

  if (input && input.length < 8) {
    return {bracuMinLength: true};
  }

  return null;
}

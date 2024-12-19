import {AbstractControl, ValidationErrors} from "@angular/forms";

export function IntegerValidator(c: AbstractControl): ValidationErrors | null {
  return !c.value || /^\d+$/.test(c.value) ? null : {integer: true};
}

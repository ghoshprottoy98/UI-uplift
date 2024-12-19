import {AbstractControl, ValidationErrors} from "@angular/forms";

export function EmailValidator(c: AbstractControl): ValidationErrors | null {
  return !c.value || /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(c.value) ? null : {'invalidEmail': true};
}

import {AbstractControl, ValidationErrors} from "@angular/forms";
import {isEmpty} from "@bracit/common-utils";

export function NoSpaceValidator(c: AbstractControl): ValidationErrors | null {
  return isEmpty(c.value) || (c.value.trim().length === c.value.length) ? null : {noSpace: true};
}

import {AbstractControl, ValidationErrors} from "@angular/forms";

export function FifteenYearsBackDateValidator(c: AbstractControl): ValidationErrors | null {
  const input = c.value;

  if (!input) {
    return null;
  }

  const currentDate = new Date();
  const fifteenYearsBackDate = currentDate.setFullYear(currentDate.getFullYear() - 15);

  if (input >= fifteenYearsBackDate) {
    return {invalidDate: true};
  }

  return null;
}

export function getFifteenYearsBackDate() {
  const currentDate = new Date();
  currentDate.setFullYear(currentDate.getFullYear() - 15);
  currentDate.setDate(currentDate.getDate() - 1);

  return currentDate;
}

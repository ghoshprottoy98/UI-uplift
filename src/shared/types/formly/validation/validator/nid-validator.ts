import {AbstractControl, ValidationErrors} from "@angular/forms";

const FIRST_YEAR_FOR_17_DIGIT_NID = 1800;
const LAST_YEAR_OF_17_DIGIT_NID = 2023;

export function NidValidator(c: AbstractControl): ValidationErrors | null {
  const input = c.value;

  if (!input) {
    return null;
  }

  // Checking valid number
  if (input && !/^\d+$/.test(input)) {
    return {nid: true};
  }

  if (![10, 13, 17].includes(input.length)) {
    return {nidLength: true};
  }

  if (input.length === 17 && !check17DigitNID(input.toString())) {
    return {invalid17DigitNID: true};
  }

  return null;
}

function check17DigitNID(value: string): boolean {
  const year = parseInt(value.substring(0, 4));
  return year > FIRST_YEAR_FOR_17_DIGIT_NID && year < LAST_YEAR_OF_17_DIGIT_NID;
}

import {AbstractControl} from "@angular/forms";
import {FormlyFieldConfig} from "@ngx-formly/core";

const getNormalizer = (type?: string) => {
  switch (type) {
    case "time":
    case "timepicker":
      return (value: string) => new Date(`2023-01-01T${value}`);

    case "date":
    case "date-picker":
      return (value: string) => new Date(value);

    //TODO: Add more type normalizer as needed

    default:
      return (value: any) => value;
  }
}

/**
 * Range validator for input group.
 *
 * **Available options:**
 *
 *    start: **required** - The key for the starting value control.
 *
 *    end: **required** The key for the ending value control.
 *
 *    type: **optional** The type of value being validated (e.g., "time"). if not provided will resolved to formly type.
 *
 *    errorPath: **optional** The key of formControl you like the error to be attached. will be use `end` key if missing.
 *
 *    message: **optional** A custom error message to be returned if validation fails.
 *
 * Example usages:
 *
 * <pre>
 * const formlyConfig: FormlyFieldConfig[] = [
 *   {
 *     key: 'startDate',
 *     type: 'timepicker',
 *     props: {
 *       label: 'Start Time',
 *     }
 *   },
 *   {
 *     key: 'endDate',
 *     type: 'timepicker',
 *     props: {
 *       label: 'End Time',
 *     }
 *   },
 *   {
 *     validators: {
 *       validation: [
 *         {
 *         name: 'range',
 *         options: { start: 'startDate', end: 'endDate', type: 'time', message: 'End date must be after start date' } }
 *       ],
 *     },
 *   }
 * ];
 * </pre>
 *
 */

function rangeValidator(options: any) {
  return {
    range: {
      message: (options.message || 'Invalid range!'),
      errorPath: (options.errorPath || options.end),
    }
  };
}

export { rangeValidator };
export function minlengthValidationMessage(err: any, field: { props: { minLength: any; }; }) {
  return `Should have at least ${field.props.minLength} characters`;
}

export function maxlengthValidationMessage(err: any, field: { props: { maxLength: any; }; }) {
  return `This value should be less than ${field.props.maxLength} characters`;
}

export function minValidationMessage(err: any, field: { props: { min: any; }; }) {
  return `This value should be more than or equal to ${field.props.min}`;
}

export function maxValidationMessage(err: any, field: { props: { max: any; }; }) {
  return `This value should be less than or equal to ${field.props.max}`;
}

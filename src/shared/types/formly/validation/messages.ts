export function minlengthValidationMessage(err, field) {
  return `Should have at least ${field.props.minLength} characters`;
}

export function maxlengthValidationMessage(err, field) {
  return `This value should be less than ${field.props.maxLength} characters`;
}

export function minValidationMessage(err, field) {
  return `This value should be more than or equal to ${field.props.min}`;
}

export function maxValidationMessage(err, field) {
  return `This value should be less than or equal to ${field.props.max}`;
}

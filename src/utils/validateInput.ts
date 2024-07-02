export function validateIfPasswordCorrect(value: string) {
  if (value.length < 8) {
    return 'Password must be at least 8 characters';
  }
  return '';
}

export function validateIfEmailInputCorrect(value: string) {
  const regexForEmailValidation =
    /^[\p{L}!#-'*+\-/\d=?^-~]+(.[\p{L}!#-'*+\-/\d=?^-~])*@[^@\s]{2,}$/u;
  if (!regexForEmailValidation.test(value)) {
    return 'Please enter a valid email address';
  }
  return '';
}

export function validateIfInputEmpty(value: string) {
  if (!value) {
    return 'Field cannot be empty';
  }
  return '';
}

export function validateNameSurnameLength(value: string) {
  if (value.length > 20) {
    return 'Field cannot exceed 20 characters';
  }
  return '';
}

export default function validateInput(name: string, value: string) {
  const errorMessage = validateIfInputEmpty(value);
  if (errorMessage === '') {
    if (name === 'email') {
      return validateIfEmailInputCorrect(value);
    }
    if (name === 'createPassword' || name === 'repeatPassword') {
      return validateIfPasswordCorrect(value);
    }
    if (name === 'name' || name === 'surname') {
      return validateNameSurnameLength(value);
    }
  }
  return errorMessage;
}

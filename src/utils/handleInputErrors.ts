import { FormConfig, FormData, FormErrors } from '../components/Auth/interfaces';
import validateInput from './validateInput';

export function setErrorMessages(
  textFields: FormConfig[],
  formData: FormData
): Record<string, string> {
  const errors: Record<string, string> = {};
  textFields.forEach(({ name }) => {
    const errorMessage = validateInput(name, formData[name]);
    if (errorMessage) {
      errors[name] = errorMessage;
    }
  });
  return errors;
}

export function resetErrors(
  errors: FormErrors,
  name: string,
  setErrors: React.Dispatch<React.SetStateAction<FormErrors>>
) {
  if (errors[name]) {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  }
}

export function getInitialErrors(config: FormConfig[]) {
  return config.reduce((accumulator: Record<string, string>, field) => {
    accumulator[field.name] = '';
    return accumulator;
  }, {});
}

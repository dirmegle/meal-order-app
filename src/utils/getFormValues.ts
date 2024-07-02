import { FormConfig } from '../components/Auth/interfaces';

export default function getFormValues(
  formConfig: FormConfig[],
  formData: FormData
): Record<string, string> {
  const formValues: Record<string, string> = {};
  formConfig.forEach((field) => {
    formValues[field.name] = formData.get(field.name) as string;
  });
  return formValues;
}

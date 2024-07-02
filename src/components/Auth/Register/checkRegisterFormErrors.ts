import isEmailExisting from '../../../utils/isEmailExisting';

export default async function checkRegisterFormErrors(
  formValues: Record<string, string>,
  errors: Record<string, string>
) {
  if (errors.email) {
    return errors;
  }

  const { email, createPassword, repeatPassword } = formValues;
  const emailExists = await isEmailExisting(email);

  if (emailExists) {
    errors.email = 'Cannot use this email for new user';
  }
  if (createPassword !== repeatPassword) {
    errors.createPassword = 'Passwords must match';
    errors.repeatPassword = 'Passwords must match';
  }
  return errors;
}

import { ChangeEvent, FormEvent, useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../Button/Button';
import TextField from '../../TextField/TextField';
import ArrowForward from '../../../assets/icons/buttons/arrowForwardFilled.svg?react';
import PasswordReset from './PasswordReset';
import { setErrorMessages, resetErrors, getInitialErrors } from '../../../utils/handleInputErrors';
import { FormErrors } from '../interfaces';
import loginFormConfig from './loginFormConfig';
import LinkButton from '../../LinkButton/LinkButton';
import SuccessIcon from '../../../assets/icons/toast/infoOutline.svg?react';
import { login } from '../../../utils/authorizeUser';
import getFormValues from '../../../utils/getFormValues';
import styles from '../authForm.module.css';
import { ToastContext, ToastContextValue } from '../../../store/ToastContext';
import RegistrationToastHandler from '../RegistrationToastHandler/RegistrationToastHandler';

export default function LoginForm() {
  const [isModalDisplayed, setIsModalDisplayed] = useState(false);
  const { addToast, removeToast } = useContext(ToastContext) as ToastContextValue;
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const [loginFormErrors, setLoginFormErrors] = useState<FormErrors>(
    getInitialErrors(loginFormConfig)
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    resetErrors(loginFormErrors, e.target.name, setLoginFormErrors);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const { email, password } = getFormValues(loginFormConfig, formData);
    const errors = setErrorMessages(loginFormConfig, { email, password });
    if (Object.keys(errors).length === 0) {
      const signedIn = await login(email, password);
      if (signedIn) {
        navigate('/');
      } else {
        setLoginFormErrors({
          email: 'Invalid email or password',
          password: 'Invalid email or password',
        });
      }
    } else {
      setLoginFormErrors(errors);
    }
  };

  const handleCloseModal = () => {
    setIsModalDisplayed(false);
  };

  const resetForm = () => {
    setLoginFormErrors({
      email: '',
      password: '',
    });
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  const showToast = () => {
    const id = addToast({
      icon: <SuccessIcon />,
      children: 'We sent you an email. Follow the instructions to get back into your account.',
      toastType: 'success',
      onClose: () => removeToast(id),
    });
  };

  return (
    <>
      <RegistrationToastHandler addToast={addToast} />
      <form className={styles.formContainer} onSubmit={handleSubmit} ref={formRef} noValidate>
        <div className={styles.inputContainer}>
          {loginFormConfig.map(({ name, label, placeholder, type, id }) => (
            <TextField
              key={id}
              id={id}
              name={name}
              label={label}
              placeholder={placeholder}
              type={type}
              errorMessage={loginFormErrors[name]}
              hasError={!!loginFormErrors[name]}
              onChange={handleInputChange}
            />
          ))}
        </div>
        <div className={styles.linkButtonContainer}>
          <LinkButton ariaLabel="Forgot password?" onClick={() => setIsModalDisplayed(true)}>
            Forgot password?
          </LinkButton>
        </div>
        <Button type="submit" category="primary" size="medium" iconEnd={<ArrowForward />} isWide>
          Log In
        </Button>
      </form>
      {isModalDisplayed && (
        <PasswordReset
          onCloseModal={handleCloseModal}
          onClearForm={resetForm}
          onDisplayToast={() => showToast()}
        />
      )}
    </>
  );
}

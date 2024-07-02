import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../authForm.module.css';
import registerFormConfig from './registerFormConfig';
import TextField from '../../TextField/TextField';
import Button from '../../Button/Button';
import CommunityRules from './CommunityRules';
import { getInitialErrors, resetErrors, setErrorMessages } from '../../../utils/handleInputErrors';
import { FormErrors } from '../interfaces';
import getFormValues from '../../../utils/getFormValues';
import Checkmark from '../../Checkmark/Checkmark';
import LinkButton from '../../LinkButton/LinkButton';
import registerUser, { UserToRegister } from '../../../utils/registerUser';
import checkRegisterFormErrors from './checkRegisterFormErrors';
import ErrorIcon from '../../../assets/icons/toast/errorOutline.svg?react';
import { ToastContext, ToastContextValue } from '../../../store/ToastContext';

export default function RegisterForm() {
  const [isModalOpen, setModalVisibility] = useState(false);
  const [areCommunityRulesChecked, setCommunityRulesChecked] = useState(false);
  const { addToast, removeToast } = useContext(ToastContext) as ToastContextValue;
  const [registerFormErrors, setRegisterFormErrors] = useState<FormErrors>(
    getInitialErrors(registerFormConfig)
  );
  const [checkboxErrorMessage, setCheckboxErrorMessage] = useState('');
  const navigate = useNavigate();
  const handleBoxCheck = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCheckboxErrorMessage('');
    }
    setCommunityRulesChecked(e.target.checked);
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    resetErrors(registerFormErrors, e.target.name, setRegisterFormErrors);
  };

  const showToast = () => {
    const id = addToast({
      icon: <ErrorIcon />,
      children: 'An error occured. Please try again or contact the support.',
      toastType: 'warning',
      onClose: () => removeToast(id),
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formValues = getFormValues(registerFormConfig, formData);
    let errors = setErrorMessages(registerFormConfig, formValues);
    try {
      errors = await checkRegisterFormErrors(formValues, errors);
    } catch {
      showToast();
    }
    setRegisterFormErrors(errors);
    if (!areCommunityRulesChecked) {
      setCheckboxErrorMessage('You must agree with Community Rules to register');
    }
    if (Object.keys(errors).length === 0 && areCommunityRulesChecked) {
      try {
        registerUser(formValues as unknown as UserToRegister);
        const isRegistrationToastOpen = true;
        navigate('/login', { state: { isRegistrationToastOpen } });
      } catch {
        showToast();
      }
    }
  };
  return (
    <>
      <form className={styles.formContainer} onSubmit={handleSubmit} noValidate>
        <div className={styles.inputContainer}>
          {registerFormConfig.map(({ name, label, placeholder, type, id }) => (
            <TextField
              key={id}
              id={id}
              name={name}
              label={label}
              placeholder={placeholder}
              type={type}
              errorMessage={registerFormErrors[name]}
              hasError={!!registerFormErrors[name]}
              onChange={handleInputChange}
            />
          ))}
        </div>
        <div className={styles.communityRulesContainer}>
          <Checkmark
            name="communityRules"
            id="communityRules"
            label={
              <>
                I have read the{' '}
                <LinkButton
                  ariaLabel="Checkbox for community rules"
                  onClick={() => setModalVisibility(true)}>
                  Community Rules
                </LinkButton>
              </>
            }
            ariaChecked={areCommunityRulesChecked}
            onChange={handleBoxCheck}
            hasError={!!checkboxErrorMessage}
            errorMessage={checkboxErrorMessage}
          />
        </div>
        <Button type="submit" category="primary" size="medium" isWide>
          Create Account
        </Button>
      </form>
      {isModalOpen && <CommunityRules onCloseModal={() => setModalVisibility(false)} />}
    </>
  );
}

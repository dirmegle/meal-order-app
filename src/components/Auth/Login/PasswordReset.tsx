import { ChangeEvent, FormEvent, useState } from 'react';
import Modal, { ModalContent, ModalFooter } from '../../Modal/Modal';
import Button from '../../Button/Button';
import TextField from '../../TextField/TextField';
import validateInput from '../../../utils/validateInput';
import { resetErrors } from '../../../utils/handleInputErrors';
import styles from '../authForm.module.css';

interface PasswordResetProps {
  onCloseModal: () => void;
  onClearForm: () => void;
  onDisplayToast: () => void;
}

export default function PasswordReset({
  onCloseModal,
  onClearForm,
  onDisplayToast,
}: PasswordResetProps) {
  const [emailErrorMessage, setEmailErrorMessage] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    resetErrors({ email: emailErrorMessage }, e.target.name, (update) =>
      setEmailErrorMessage(update.name || '')
    );
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const email = formData.get('email') as string;

    const errorMessage = validateInput('email', email);

    if (errorMessage === '') {
      onCloseModal();
      onClearForm();
      onDisplayToast();
    } else {
      setEmailErrorMessage(errorMessage);
    }
  };

  return (
    <Modal modalHeadline="Reset your password" onClose={() => onCloseModal()}>
      <form onSubmit={handleSubmit} noValidate>
        <ModalContent>
          <p>
            Enter your email address, and we will send you a link to get back into your account.
          </p>
          <span className={styles.inputWrapper}>
            <TextField
              name="email"
              label="Email"
              placeholder="Email"
              id="email"
              type="email"
              errorMessage={emailErrorMessage}
              hasError={!!emailErrorMessage}
              onChange={handleInputChange}
            />
          </span>
        </ModalContent>
        <ModalFooter>
          <Button type="button" category="secondary" size="medium" onClick={() => onCloseModal()}>
            Return to login
          </Button>
          <Button type="submit" category="primary" size="medium">
            Send recovery link
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}

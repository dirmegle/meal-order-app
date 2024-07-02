import classNames from 'classnames';
import { ChangeEvent } from 'react';
import styles from './textField.module.css';

interface TextFieldProps {
  name: string;
  label: string;
  placeholder: string;
  id: string;
  type: string;
  errorMessage?: string;
  hasError?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function TextField({
  name,
  label,
  placeholder,
  errorMessage,
  id,
  type,
  hasError = false,
  isDisabled = false,
  isRequired = false,
  onChange,
}: TextFieldProps) {
  const textFieldClasses = classNames(styles.textfield, {
    [styles.textFieldInError]: hasError,
  });

  const labelClasses = classNames(styles.label, {
    [styles.labelInError]: hasError,
    [styles.labelDisabled]: isDisabled,
  });
  return (
    <div>
      <label htmlFor={id} className={labelClasses}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        className={textFieldClasses}
        disabled={isDisabled}
        required={isRequired}
        onChange={onChange}
      />
      {hasError && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
}

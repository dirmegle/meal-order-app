import { ChangeEvent, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './checkmark.module.css';

interface CheckmarkProps {
  name: string;
  id: string;
  label: ReactNode;
  ariaChecked: boolean;
  errorMessage?: string;
  hasError?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function Checkmark({
  name,
  id,
  label,
  ariaChecked,
  errorMessage,
  hasError = false,
  isDisabled = false,
  isRequired = false,
  onChange,
}: CheckmarkProps) {
  const checkboxLabelClasses = classNames({
    [styles.labelInError]: hasError,
    [styles.labelDisabled]: isDisabled,
  });

  const checkboxClasses = classNames(styles.customCheckbox, {
    [styles.checkboxInError]: hasError,
  });

  return (
    <div>
      <label htmlFor={id} className={styles.checkboxContainer}>
        <span className={checkboxLabelClasses}>{label}</span>
        <input
          type="checkbox"
          aria-checked={ariaChecked}
          id={id}
          name={name}
          disabled={isDisabled}
          required={isRequired}
          className={styles.checkbox}
          onChange={onChange}
        />
        <span className={checkboxClasses} />
      </label>
      {hasError && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
}

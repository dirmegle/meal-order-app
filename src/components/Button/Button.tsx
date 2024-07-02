import { ReactNode } from 'react';
import classNames from 'classnames';
import styles from './button.module.css';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  children: ReactNode;
  category: 'primary' | 'secondary' | 'tertiary';
  size: 'large' | 'medium' | 'small' | 'xsmall';
  focusColor?: 'purple' | 'orange';
  isUppercase?: boolean;
  isDisabled?: boolean;
  isWide?: boolean;
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
  onClick?: () => void;
}

export default function Button({
  type = 'button',
  children,
  category,
  size,
  isUppercase = false,
  focusColor = 'purple',
  isDisabled = false,
  isWide = false,
  iconStart,
  iconEnd,
  onClick,
}: ButtonProps) {
  const renderIcon = (icon: ReactNode) => {
    if (!icon) {
      return null;
    }
    return (
      <div className={styles.iconContainer}>
        <span className={styles.iconWrapper}>{icon}</span>
      </div>
    );
  };

  const buttonClasses = classNames(
    styles.button,
    styles[category],
    styles[size],
    isWide ? styles.wide : '',
    styles[focusColor],
    isUppercase && styles.uppercase,
    iconStart ? styles.iconStart : '',
    iconEnd ? styles.iconEnd : ''
  );

  return (
    // eslint-disable-next-line react/button-has-type
    <button onClick={onClick} disabled={isDisabled} type={type} className={buttonClasses}>
      {renderIcon(iconStart)}
      {children}
      {renderIcon(iconEnd)}
    </button>
  );
}

import classNames from 'classnames';
import { ReactNode } from 'react';
import styles from './linkButton.module.css';

interface LinkButtonProps {
  ariaLabel: string;
  children: ReactNode;
  isDisabled?: boolean;
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
  isStandalone?: boolean;
  onClick: () => void;
}

export default function LinkButton({
  ariaLabel,
  children,
  iconStart,
  iconEnd,
  onClick,
  isStandalone = false,
  isDisabled = false,
}: LinkButtonProps) {
  const handleClick = () => {
    onClick();
  };

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

  const buttonClasses = classNames(styles.button, isStandalone && styles.standalone);

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isDisabled}
      className={buttonClasses}
      aria-label={ariaLabel}>
      {renderIcon(iconStart)}
      {children}
      {renderIcon(iconEnd)}
    </button>
  );
}

import classNames from 'classnames';
import { ReactNode } from 'react';
import styles from './iconButton.module.css';

interface IconButtonProps {
  ariaLabel?: string;
  ariaHidden?: boolean;
  ariaExpanded?: boolean;
  category: 'accent' | 'outlined' | 'tertiary' | 'transparent';
  children: ReactNode;
  size: 'medium' | 'small';
  isDisabled?: boolean;
  onClick: () => void;
}

export default function IconButton({
  ariaLabel,
  ariaHidden,
  ariaExpanded,
  category,
  children,
  size,
  onClick,
  isDisabled = false,
}: IconButtonProps) {
  const iconButtonClasses = classNames(styles.iconButton, styles[category], styles[size]);
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      type="button"
      className={iconButtonClasses}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
      aria-expanded={ariaExpanded}>
      <div className={styles.iconContainer}>{children}</div>
    </button>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import Close from '../../assets/icons/buttons/closeFilled.svg?react';
import IconButton from '../IconButton/IconButton';
import focusTrap from '../../utils/focusTrap';
import styles from './Toast.module.css';

export interface ToastProps {
  icon: React.ReactNode;
  children: React.ReactNode;
  toastType: 'info' | 'success' | 'warning';
  onClose: () => void;
}

export default function Toast({ icon, children, toastType, onClose }: ToastProps) {
  const [isActive, setIsActive] = useState(false);
  const toastRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsActive(true);
  }, []);

  const handleClose = () => {
    setIsActive(false);
    onClose();
  };

  const toastClasses = classNames(styles.toastCard, styles[toastType], {
    [styles.active]: isActive,
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsActive(false);
        onClose();
        event.stopPropagation();
      }
    };

    if (toastRef.current) {
      toastRef.current.focus();
      focusTrap(toastRef.current);
    }

    document.addEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className={toastClasses} ref={toastRef} tabIndex={-1}>
      {icon && <div>{icon}</div>}
      <div className={styles.toastText}>{children}</div>
      <div className={styles.toastCloseIcon}>
        <IconButton onClick={handleClose} size="medium" category="transparent" ariaLabel="Close">
          <Close />
        </IconButton>
      </div>
    </div>
  );
}

import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import Close from '../../assets/icons/buttons/closeFilled.svg?react';
import IconButton from '../IconButton/IconButton';
import focusTrap from '../../utils/focusTrap';
import styles from './Modal.module.css';

interface ModalProps {
  modalHeadline: string;
  children: React.ReactNode;
  widthClass?: 'small' | 'medium' | 'large';
  onClose: () => void;
}

export function ModalContent({ children }: { children: React.ReactNode }) {
  return <div className={styles.modalContent}>{children}</div>;
}

export function ModalFooter({ children }: { children: React.ReactNode }) {
  return <div className={styles.modalFooter}>{children}</div>;
}

export default function Modal({
  modalHeadline,
  children,
  widthClass = 'small',
  onClose,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    if (modalRef.current) {
      modalRef.current.focus();
      focusTrap(modalRef.current);
    }

    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (modalRef.current && !(modalRef.current as HTMLElement).contains(target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onClose]);

  const modalClasses = classNames(styles.modalCard, styles[widthClass]);

  return (
    <div className={styles.modalOverlay}>
      <div ref={modalRef} className={modalClasses} tabIndex={-1}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalHeadline}>{modalHeadline}</h3>
          <IconButton onClick={onClose} size="medium" category="tertiary" ariaLabel="Close">
            <Close />
          </IconButton>
        </div>
        <div className={styles.modalContentWrapper}>{children}</div>
      </div>
    </div>
  );
}

import { ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from './dialogContent.module.css';

const cx = classNames.bind(styles);

interface DialogContentProps {
  icon: ReactNode;
  children: ReactNode;
  isContentCentered?: boolean;
}

export default function DialogContent({ icon, children, isContentCentered }: DialogContentProps) {
  return (
    <div className={cx('contentContainer', { centeredContent: isContentCentered })}>
      <div>{icon}</div>
      <div className={cx('text', { textLarge: isContentCentered })}>{children}</div>
    </div>
  );
}

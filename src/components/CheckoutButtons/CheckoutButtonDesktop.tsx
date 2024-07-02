import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './checkoutButtonDesktop.module.css';

const cx = classNames.bind(styles);

interface CheckoutButtonDesktopProps {
  submitedText: string;
  buttonText: string;
  isSubmited: boolean;
  handleSubmit: () => void;
  submitedIcon?: React.ReactNode;
  isDisabled?: boolean;
}

export default function CheckoutButtonDesktop({
  submitedText,
  buttonText,
  isSubmited,
  handleSubmit,
  submitedIcon,
  isDisabled = false,
}: CheckoutButtonDesktopProps) {
  const [animation, setAnimation] = useState<'none' | 'forward' | 'reverse'>('none');
  const [shouldSubmit, setShouldSubmit] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (animation === 'forward' || animation === 'reverse') {
      timer = setTimeout(() => {
        setAnimation('none');
        setShouldSubmit(true);
      }, 1500);
    }

    if (animation === 'reverse') {
      timer = setTimeout(() => {
        setAnimation('none');
        setShouldSubmit(false);
      }, 1500);
    }

    return () => clearTimeout(timer);
  }, [animation]);

  useEffect(() => {
    if (shouldSubmit) {
      handleSubmit();
      setAnimation('none');
      setShouldSubmit(false);
    }
  }, [shouldSubmit, handleSubmit]);

  const handleMouseDown = () => {
    if (!isDisabled && !isSubmited) {
      setAnimation('forward');
    }
  };

  const handleMouseUp = () => {
    if (animation === 'forward') {
      setAnimation('reverse');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Tab' || event.key === 'Shift' || (event.shiftKey && event.key === 'Tab')) {
      return;
    }
    handleMouseDown();
  };

  const handleKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === 'Tab' || event.key === 'Shift' || (event.shiftKey && event.key === 'Tab')) {
      return;
    }
    handleMouseUp();
  };

  return (
    <button
      type="submit"
      disabled={isDisabled}
      className={cx('button', { submited: isSubmited }, { disabled: isDisabled })}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}>
      {isSubmited ? (
        <span className={styles.submited}>
          {submitedText} {submitedIcon && submitedIcon}
        </span>
      ) : (
        <span className={cx('buttonText', { mouseUp: animation === 'reverse' })}>{buttonText}</span>
      )}
      {!isSubmited && animation !== 'none' && (
        <div
          className={cx('progressBar', {
            progressForward: animation === 'forward',
            progressReverse: animation === 'reverse',
          })}
        />
      )}
    </button>
  );
}

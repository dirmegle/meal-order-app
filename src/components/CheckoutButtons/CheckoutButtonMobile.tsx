import { TouchEvent, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './checkoutButtonMobile.module.css';

const cx = classNames.bind(styles);

interface CheckoutButtonMobileProps {
  submitedText: string;
  textLeft: string;
  textRight: string;
  isSubmited: boolean;
  handleSubmit: () => void;
  isDisabled?: boolean;
}

export default function CheckoutButtonMobile({
  submitedText,
  textRight,
  textLeft,
  isSubmited,
  handleSubmit,
  isDisabled = false,
}: CheckoutButtonMobileProps) {
  const [dragDistance, setDragDistance] = useState(0);
  const [startX, setStartX] = useState(0);
  const maxDragDistance = 105;

  const handleDragStart = (e: TouchEvent) => {
    if (!isDisabled) {
      setStartX(e.touches[0]?.clientX);
    }
  };

  const handleDragMove = (e: TouchEvent) => {
    if (startX) {
      const distance = e.touches[0].clientX - startX;
      setDragDistance(Math.min(Math.max(0, distance), maxDragDistance));
    }
  };

  const handleDragEnd = () => {
    if (dragDistance === maxDragDistance) {
      handleSubmit();
      setDragDistance(0);
    }
    setDragDistance(0);
  };

  const resetState = () => {
    setDragDistance(0);
  };

  return (
    <div className={cx('container', { confirmed: isSubmited, disabled: isDisabled })}>
      {!isSubmited ? (
        <div className={cx('slider')} style={{ transform: `translateX(${dragDistance}px)` }}>
          <span
            className={cx('textOnLeft', {
              dragging: dragDistance || dragDistance === maxDragDistance,
            })}>
            {textLeft}
          </span>
          <button
            disabled={isDisabled}
            type="submit"
            aria-label={dragDistance === maxDragDistance ? textLeft : textRight}
            className={cx('button')}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
            onTouchCancel={handleDragEnd}
            onTransitionEnd={resetState}
          />
          <span className={cx('textOnRight', { dragging: dragDistance })}>{textRight}</span>
        </div>
      ) : (
        <div className={styles.submitedText}>
          {submitedText}
          <span className={styles.icon} />
        </div>
      )}
    </div>
  );
}

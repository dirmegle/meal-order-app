import classNames from 'classnames';
import HorizontalLogo from '../../assets/icons/logo/logoHorizontal.svg?react';
import styles from './loadingAnimation.module.css';

export default function LoadingAnimation() {
  const outerCircleClasses = classNames(styles.circle, styles.outerCircle);
  const innerCircleClasses = classNames(styles.circle, styles.innerCircle);
  const logoCircleClasses = classNames(styles.circle, styles.logoCircle);
  return (
    <div className={styles.animationContainer} aria-busy="true" aria-live="polite">
      <div className={outerCircleClasses} />
      <div className={innerCircleClasses} />
      <div className={logoCircleClasses}>
        <span className={styles.logo}>
          <HorizontalLogo />
        </span>
      </div>
    </div>
  );
}

export function LoadingScreen() {
  return (
    <div className={styles.loadingScreenContainer}>
      <LoadingAnimation />
    </div>
  );
}

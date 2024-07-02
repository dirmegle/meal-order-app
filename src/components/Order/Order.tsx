import classNames from 'classnames/bind';
import { ReactNode } from 'react';
import getImageUrl from '../../utils/getImageUrl';
import styles from './order.module.css';

const cx = classNames.bind(styles);

export interface OrderProps {
  textSize: 'large' | 'medium' | 'small';
  imageSize: 'medium' | 'small';
  title: string;
  dishType: string;
  vendorName?: string;
  children?: ReactNode;
}

export default function Order({
  textSize,
  imageSize,
  title,
  dishType,
  vendorName,
  children,
}: OrderProps) {
  return (
    <div className={cx('container', textSize)}>
      <img className={cx('image', imageSize)} src={getImageUrl(dishType)} alt={dishType} />
      <div className={styles.mealInfo}>
        {vendorName && <span className={cx('vendorName', textSize)}>{vendorName}</span>}
        <span className={styles.titleAndPrice}>
          {title}
          {children && <div className={cx('priceAndButton', textSize)}>{children}</div>}
        </span>
      </div>
    </div>
  );
}

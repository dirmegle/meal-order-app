import { useEffect, useState } from 'react';
import BlankCard, { CardContent, CardHeader } from '../BlankCard/BlankCard';
import SyncIcon from '../../assets/icons/buttons/syncFilled.svg?react';
import IconButton from '../IconButton/IconButton';
import getFormatedDateRange from '../../utils/dates';
import styles from './availableLunchTable.module.css';

interface AvailableLunchTableProps {
  children: React.ReactNode;
  onClick: () => void;
}

export default function AvailableLunchTable({ children, onClick }: AvailableLunchTableProps) {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const { timeWithDate } = getFormatedDateRange();
    setCurrentTime(timeWithDate);
  }, [onClick]);

  return (
    <BlankCard className={styles.availableLunchTableCard}>
      <CardHeader className={styles.availableLunchTableContent}>
        <div className={styles.availableLunchTableHeader}>
          <h3 className={styles.availableLunchTableHeadline}>Available Orders</h3>
          <div className={styles.refreshSection}>
            refreshed
            <span>{currentTime}</span>
            <IconButton
              category="outlined"
              size="medium"
              onClick={onClick}
              ariaLabel="refresh available orders">
              <SyncIcon />
            </IconButton>
          </div>
        </div>
      </CardHeader>
      <CardContent className={styles.availableLunchTableContent}>
        <div className={styles.availableLunchTableLabels}>
          <span>Order Summary</span>
          <span>Vendor</span>
          <span>Take It From</span>
        </div>
        <div className={styles.availableLunchTableContent}>{children}</div>
      </CardContent>
    </BlankCard>
  );
}

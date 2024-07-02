import classNames from 'classnames';
import styles from './blankCard.module.css';

interface BlankCardProps {
  className?: string;
  children?: React.ReactNode;
}

export function CardHeader({ children, className }: BlankCardProps) {
  return <div className={className}>{children}</div>;
}

export function CardContent({ children, className }: BlankCardProps) {
  return <div className={className}>{children}</div>;
}

export function CardFooter({ children, className }: BlankCardProps) {
  return <div className={className}>{children}</div>;
}

export default function BlankCard({ children, className }: BlankCardProps) {
  const cardClasses = classNames(styles.card, className);
  return <div className={cardClasses}>{children}</div>;
}

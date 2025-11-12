import styles from './PriceTag.module.css';

interface PriceTagProps {
  amount: number;
  currency?: string;
  period?: string;
  className?: string;
}

export default function PriceTag({
  amount,
  currency = 'USD',
  period,
  className = '',
}: PriceTagProps) {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);

  return (
    <div className={`${styles.priceTag} ${className}`}>
      <span className={styles.amount}>{formattedPrice}</span>
      {period && <span className={styles.period}>/ {period}</span>}
    </div>
  );
}

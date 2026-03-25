import styles from './StatsBar.module.css';

export default function StatsBar() {
  const stats = [
    { value: '50K+', label: 'Monthly Readers' },
    { value: '100%', label: 'Honest Reviews' },
    { value: '₹0', label: 'Always Free' },
    { value: '200+', label: 'Products Reviewed' },
    { value: '50K+', label: 'Monthly Readers' },
  ];

  return (
    <div className={styles.statsContainer}>
      <div className={styles.statsList}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.statItem}>
            <span className={styles.statValue}>{stat.value}</span>
            <span>{stat.label}</span>
            {index < stats.length - 1 && <span className={styles.dot}></span>}
          </div>
        ))}
      </div>
    </div>
  );
}

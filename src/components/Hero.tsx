import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`${styles.badge} animate-fade-in`} style={{ animationDelay: '0.1s' }}>
        <span className={styles.badgeDot}></span>
        INDIA'S TOP TECH & GADGET REVIEWS
      </div>
      
      <h1 className={`${styles.title} animate-fade-in`} style={{ animationDelay: '0.2s' }}>
        <span className={styles.titleLine}>Pick Smarter.</span>
        <span className={styles.titleLine}>Buy <span className={styles.highlight}>Better.</span></span>
      </h1>
      
      <p className={`${styles.subtitle} animate-fade-in`} style={{ animationDelay: '0.3s' }}>
        Honest reviews, budget picks, and expert buying guides for tech gadgets — made for Indian buyers.
      </p>
      
      <div className={`${styles.ctaGroup} animate-fade-in`} style={{ animationDelay: '0.4s' }}>
        <button className={styles.primaryCta}>
          Join the Beta
          <span className={styles.arrow}>→</span>
        </button>
        <button className={styles.secondaryCta}>
          Explore Reviews
          <span className={styles.arrow}>→</span>
        </button>
      </div>
    </section>
  );
}

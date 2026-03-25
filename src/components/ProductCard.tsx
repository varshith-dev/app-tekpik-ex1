import Link from 'next/link';
import styles from './ProductCard.module.css';
import { ArrowRight } from 'lucide-react';

interface ProductCardProps {
  id: string;
  title: string;
  category: string;
  price: string;
  imageUrl: string;
  index: number;
}

export default function ProductCard({ id, title, category, price, imageUrl }: ProductCardProps) {
  return (
    <Link href={`/product/${id}`} className={styles.card}>
      <div className={styles.imageContainer}>
        {/* Placeholder if image fails */}
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'var(--background-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
           <span style={{ color: 'var(--foreground-muted)', fontSize: '0.75rem', opacity: 0.5 }}>{category}</span>
        </div>
        {imageUrl && <img src={imageUrl} alt={title} className={styles.image} style={{ position: 'relative', zIndex: 1 }} />}
      </div>
      
      <div className={styles.content}>
        <span className={styles.category}>{category}</span>
        <h3 className={styles.title}>{title}</h3>
        
        <div className={styles.priceRow}>
          <span className={styles.price}>{price}</span>
          <span className={styles.quickAdd}>View <ArrowRight size={14} style={{ display: 'inline', verticalAlign: 'middle' }}/></span>
        </div>
      </div>
    </Link>
  );
}

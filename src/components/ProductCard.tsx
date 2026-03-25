import Link from 'next/link';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  id: string;
  title: string;
  category: string;
  price: string;
  imageUrl: string;
  index: number;
}

export default function ProductCard({ id, title, category, price, imageUrl, index }: ProductCardProps) {
  return (
    <Link href={`/product/${id}`} className={`${styles.card} animate-fade-in`} style={{ animationDelay: `${index * 0.1}s` }}>
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt={title} className={styles.image} />
      </div>
      <div className={styles.content}>
        <span className={styles.category}>{category}</span>
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.price}>{price}</span>
      </div>
    </Link>
  );
}

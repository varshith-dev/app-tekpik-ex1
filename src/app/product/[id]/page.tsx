import { getProduct } from '@/lib/supabase';
import Header from '@/components/Header';
import { notFound } from 'next/navigation';
import AddToCartButton from './AddToCartButton';
import styles from './page.module.css';

export default async function ProductPage({ params }: { params: { id: string } }) {
  let product = null;

  try {
    product = await getProduct(params.id);
  } catch (error) {
    console.error(error);
  }

  if (!product) {
    notFound();
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={`${styles.imageSection} animate-fade-in`}>
          <img src={product.imageUrl} alt={product.title} className={styles.image} />
        </div>
        
        <div className={`${styles.detailsSection} animate-fade-in`} style={{ animationDelay: '0.1s' }}>
          <div className={styles.breadcrumbs}>Shop / {product.category}</div>
          <h1 className={styles.title}>{product.title}</h1>
          <div className={styles.price}>{product.formattedPrice}</div>
          
          <p className={styles.description}>{product.description}</p>
          
          {product.features && product.features.length > 0 && (
            <>
              <h3 className={styles.featuresTitle}>Key Features</h3>
              <ul className={styles.featuresList}>
                {product.features.map((feature, i) => (
                  <li key={i} className={styles.featureItem}>
                    <svg className={styles.featureIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </>
          )}

          <AddToCartButton product={product} />
        </div>
      </div>
    </>
  );
}


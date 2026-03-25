import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import { getProducts } from '@/lib/supabase';
import styles from './page.module.css';
import { Product } from '@/data/products';

export default async function Home() {
  let products: Product[] = [];
  let errorMsg = null;

  try {
    products = await getProducts();
  } catch (error: any) {
    errorMsg = error.message;
  }

  return (
    <div className={styles.main}>
      <Header />
      
      <section className={styles.storeSection}>
        <div className={styles.storeHeader}>
          <h1 className={styles.storeTitle}>All Products</h1>
        </div>
        
        {errorMsg ? (
          <div className={styles.errorState}>
            <h3 className={styles.errorTitle}>Missing Database Setup</h3>
            <p>{errorMsg}</p>
            <p style={{ marginTop: '1rem', fontSize: '0.875rem' }}>Please follow the supabase_setup.md artifact to configure your credentials and add products.</p>
          </div>
        ) : products.length === 0 ? (
          <div className={styles.emptyState}>
            <p style={{ color: 'var(--gray-dark)' }}>No products found in the database. Please add some products using the Supabase dashboard.</p>
          </div>
        ) : (
          <div className={styles.productGrid}>
            {products.map((product, index) => (
              <ProductCard 
                key={product.id}
                id={product.id}
                title={product.title}
                category={product.category}
                price={product.formattedPrice}
                imageUrl={product.imageUrl}
                index={index}
              />
            ))}
          </div>
        )}
      </section>
      
      <footer className={styles.footer}>
        &copy; {new Date().getFullYear()} TekPik. All rights reserved.
      </footer>
    </div>
  );
}

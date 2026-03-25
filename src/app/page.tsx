import Header from '@/components/Header';
import StorefrontView from '@/components/StorefrontView';
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
      
      {errorMsg ? (
        <section className={styles.storeSection}>
          <div className={`${styles.storeHeader} animate-fade-in`}>
            <div className={styles.storeBadge}>SYSTEM ALERT</div>
            <h1 className={styles.storeTitle}>Service Unavailable</h1>
          </div>
          <div className={`${styles.errorState} animate-fade-in`} style={{ animationDelay: '0.2s' }}>
            <h3 className={styles.errorTitle}>Database Offline</h3>
            <p>{errorMsg}</p>
            <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', opacity: 0.8 }}>Refer to the supabase_setup.md artifact to connect your store.</p>
          </div>
        </section>
      ) : products.length === 0 ? (
        <section className={styles.storeSection}>
           <div className={`${styles.storeHeader} animate-fade-in`}>
            <div className={styles.storeBadge}>CURATED COLLECTION</div>
            <h1 className={styles.storeTitle}>Elevate your everyday <span>with premium tech.</span></h1>
          </div>
          <div className={`${styles.emptyState} animate-fade-in`} style={{ animationDelay: '0.2s' }}>
            <p style={{ color: 'var(--foreground-muted)', fontWeight: 600 }}>The vault is currently empty. Run the seed_products.sql script in Supabase!</p>
          </div>
        </section>
      ) : (
        <StorefrontView initialProducts={products} />
      )}
      
      <footer className={styles.footer}>
        &copy; {new Date().getFullYear()} TekPik. Designed for Excellence.
      </footer>
    </div>
  );
}

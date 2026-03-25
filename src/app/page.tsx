import Header from '@/components/Header';
import Hero from '@/components/Hero';
import StatsBar from '@/components/StatsBar';
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
      <Hero />
      <StatsBar />
      
      <section className={styles.discoverSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionSubtitle}>Discover</div>
          <h2 className={styles.sectionTitle}>Featured Products</h2>
        </div>
        
        {errorMsg ? (
          <div style={{ padding: '4rem 2rem', textAlign: 'center', backgroundColor: '#fee2e2', color: '#991b1b', borderRadius: '1rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Missing Database Setup</h3>
            <p>{errorMsg}</p>
            <p style={{ marginTop: '1rem', fontSize: '0.875rem' }}>Please follow the supabase_setup.md artifact to configure your credentials and add products.</p>
          </div>
        ) : products.length === 0 ? (
          <div style={{ padding: '4rem 2rem', textAlign: 'center', backgroundColor: 'var(--gray-light)', borderRadius: '1rem' }}>
            <p style={{ color: 'var(--gray-dark)' }}>No products found in the database. Please add some products using the Supabase dashboard.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2.5rem', textAlign: 'left' }}>
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
      
      <footer style={{ marginTop: 'auto', padding: '3rem 2rem', textAlign: 'center', borderTop: '1px solid var(--border)', color: 'var(--gray-dark)', fontSize: '0.875rem' }}>
        &copy; {new Date().getFullYear()} TekPik. All rights reserved.
      </footer>
    </div>
  );
}



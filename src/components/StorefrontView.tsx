'use client';

import { useState } from 'react';
import { Product } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../app/page.module.css';

export default function StorefrontView({ initialProducts }: { initialProducts: Product[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(initialProducts.map(p => p.category)));

  const filteredProducts = initialProducts.filter(product => {
    const searchLower = searchQuery.toLowerCase();
    const titleMatch = product.title?.toLowerCase().includes(searchLower) || false;
    const descMatch = product.description?.toLowerCase().includes(searchLower) || false;
    const matchesSearch = titleMatch || descMatch;
    
    const matchesCategory = activeCategory ? product.category === activeCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className={styles.storeSection}>
      <div className={`${styles.storeHeader} animate-fade-in`}>
        <div className={styles.storeBadge}>Curated Collection</div>
        <h1 className={styles.storeTitle}>Elevate your everyday <span>with premium tech.</span></h1>
      </div>

      <motion.div 
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        style={{ marginBottom: '3rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
      >
        <div style={{ position: 'relative', maxWidth: '500px', width: '100%' }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--foreground-muted)' }} />
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ 
              width: '100%', padding: '0.875rem 1rem 0.875rem 2.5rem', 
              fontSize: '0.9375rem', borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)', backgroundColor: 'var(--background)',
              color: 'var(--foreground)', outline: 'none', transition: 'border-color 0.2s ease',
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setActiveCategory(null)}
            style={{ 
              padding: '0.5rem 1rem', borderRadius: 'var(--radius-pill)', fontSize: '0.875rem', fontWeight: 500,
              backgroundColor: activeCategory === null ? 'var(--foreground)' : 'var(--background-secondary)',
              color: activeCategory === null ? 'var(--background)' : 'var(--foreground-muted)',
              border: '1px solid var(--border)'
            }}
          >
            All
          </button>
          
          {categories.map(category => (
            <button 
              key={category}
              onClick={() => setActiveCategory(category)}
              style={{ 
                padding: '0.5rem 1rem', borderRadius: 'var(--radius-pill)', fontSize: '0.875rem', fontWeight: 500,
                backgroundColor: activeCategory === category ? 'var(--foreground)' : 'var(--background-secondary)',
                color: activeCategory === category ? 'var(--background)' : 'var(--foreground-muted)',
                border: '1px solid var(--border)'
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </motion.div>
      
      {filteredProducts.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.emptyState}>
          <Search size={32} style={{ margin: '0 auto 1rem', opacity: 0.2 }} />
          <p style={{ color: 'var(--foreground-muted)', fontWeight: 500, fontSize: '1.125rem' }}>No products match your filters.</p>
          <button className="btn-primary" style={{ marginTop: '1.5rem' }} onClick={() => { setSearchQuery(''); setActiveCategory(null); }}>
            Clear Filters
          </button>
        </motion.div>
      ) : (
        <motion.div layout className={styles.productGrid}>
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                key={product.id}
              >
                <ProductCard 
                  id={product.id}
                  title={product.title}
                  category={product.category}
                  price={product.formattedPrice}
                  imageUrl={product.imageUrl}
                  index={0} 
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
}

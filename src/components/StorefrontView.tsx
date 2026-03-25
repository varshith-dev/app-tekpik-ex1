'use client';

import { useState } from 'react';
import { Product } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { Search, FilterX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../app/page.module.css';

export default function StorefrontView({ initialProducts }: { initialProducts: Product[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Derive unique categories from products
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
        <div className={styles.storeBadge}>CURATED COLLECTION</div>
        <h1 className={styles.storeTitle}>Elevate your everyday <span>with premium tech.</span></h1>
      </div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{ marginBottom: '3rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
      >
        <div style={{ position: 'relative', maxWidth: '600px', width: '100%' }}>
          <Search size={20} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--foreground-muted)' }} />
          <input 
            type="text" 
            placeholder="Search premium products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ 
              width: '100%', padding: '1.25rem 1.25rem 1.25rem 3.5rem', 
              fontSize: '1.125rem', borderRadius: '9999px',
              border: '1px solid var(--border-light)', backgroundColor: 'var(--glass-bg)',
              backdropFilter: 'blur(10px)', color: 'var(--foreground)',
              outline: 'none', transition: 'all 0.3s ease', boxShadow: 'var(--glass-shadow)'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setActiveCategory(null)}
            style={{ 
              padding: '0.75rem 1.5rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 600,
              backgroundColor: activeCategory === null ? 'var(--foreground)' : 'var(--background-secondary)',
              color: activeCategory === null ? 'var(--background)' : 'var(--foreground-muted)',
              border: '1px solid var(--border-light)'
            }}
          >
            All
          </button>
          
          {categories.map(category => (
            <button 
              key={category}
              onClick={() => setActiveCategory(category)}
              style={{ 
                padding: '0.75rem 1.5rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 600,
                backgroundColor: activeCategory === category ? 'var(--foreground)' : 'var(--background-secondary)',
                color: activeCategory === category ? 'var(--background)' : 'var(--foreground-muted)',
                border: '1px solid var(--border-light)'
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </motion.div>
      
      {filteredProducts.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className={styles.emptyState}
        >
          <FilterX size={48} style={{ margin: '0 auto 1.5rem', opacity: 0.5 }} />
          <p style={{ color: 'var(--foreground-muted)', fontWeight: 600, fontSize: '1.25rem' }}>No products match your filters.</p>
          <button className="btn-primary" style={{ marginTop: '2rem' }} onClick={() => { setSearchQuery(''); setActiveCategory(null); }}>
            Clear Filters
          </button>
        </motion.div>
      ) : (
        <motion.div layout className={styles.productGrid}>
          <AnimatePresence>
            {filteredProducts.map((product, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={product.id}
              >
                <ProductCard 
                  id={product.id}
                  title={product.title}
                  category={product.category}
                  price={product.formattedPrice}
                  imageUrl={product.imageUrl}
                  index={0} // Disable nested staggered animation to let layout animation handle it
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
}

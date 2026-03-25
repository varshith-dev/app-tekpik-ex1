'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/data/products';
import styles from './page.module.css';

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button className={styles.addToCartBtn} onClick={handleAdd}>
      {added ? (
        <>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          Added to Cart
        </>
      ) : (
        `Add to Cart — ${product.formattedPrice}`
      )}
    </button>
  );
}

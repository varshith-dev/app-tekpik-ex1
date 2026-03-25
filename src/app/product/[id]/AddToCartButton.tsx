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
      {added ? 'Added to Cart ✓' : 'Add to Cart — ' + product.formattedPrice}
    </button>
  );
}

'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import styles from './Header.module.css';
import { useState } from 'react';
import CartDrawer from './CartDrawer';
import { ShoppingBag } from 'lucide-react';

export default function Header() {
  const { cartCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          TekPik<span className={styles.dot}>.</span>
        </Link>
        
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>Shop</Link>
          <Link href="/" className={styles.navLink}>Collections</Link>
          <button onClick={() => setIsCartOpen(true)} className={styles.cta}>
            <ShoppingBag size={18} />
            Cart
            {cartCount > 0 && <span className={styles.cartCount}>{cartCount}</span>}
          </button>
        </nav>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}

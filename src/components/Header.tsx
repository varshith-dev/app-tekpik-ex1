'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import styles from './Header.module.css';

export default function Header() {
  const { cartCount } = useCart();

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        TekPik<span className={styles.dot}>.</span>
      </Link>
      
      <nav className={styles.nav}>
        <Link href="/" className={styles.navLink}>Shop</Link>
        <Link href="/cart" className={styles.cta}>
          Cart ({cartCount})
        </Link>
      </nav>
    </header>
  );
}

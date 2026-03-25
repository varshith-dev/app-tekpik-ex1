'use client';

import { useCart } from '@/context/CartContext';
import Header from '@/components/Header';
import Link from 'next/link';
import styles from './page.module.css';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();

  const formattedTotal = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(cartTotal);

  if (cartItems.length === 0) {
    return (
      <div className="app-container">
        <Header />
        <div className={`${styles.emptyState} animate-fade-in`}>
          <h1 className={styles.emptyTitle}>Your cart is empty.</h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--foreground-muted)' }}>Looks like you haven't added any premium tech to your cart yet.</p>
          <div style={{ marginTop: '3rem' }}>
            <Link href="/" className="btn-primary">
              Discover Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Header />
      <div className={styles.container}>
        <h1 className={`${styles.title} animate-fade-in`}>Shopping Cart</h1>
        
        <div className={styles.grid}>
          <div className={styles.cartItems}>
            {cartItems.map((item, index) => (
              <div key={item.id} className={`${styles.item} animate-fade-in`} style={{ animationDelay: `${index * 0.1}s` }}>
                <Link href={`/product/${item.id}`} className={styles.imageContainer}>
                  <img src={item.imageUrl} alt={item.title} className={styles.image} />
                </Link>
                
                <div className={styles.itemDetails}>
                  <div className={styles.itemHeader}>
                    <Link href={`/product/${item.id}`} className={styles.itemTitle}>{item.title}</Link>
                    <div className={styles.itemPrice}>{item.formattedPrice}</div>
                  </div>
                  <div className={styles.itemCategory}>{item.category}</div>
                  
                  <div className={styles.quantityControls}>
                    <button 
                      className={styles.qtyBtn} 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className={styles.qtyValue}>{item.quantity}</span>
                    <button 
                      className={styles.qtyBtn} 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                    
                    <button 
                      className={styles.removeBtn} 
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className={`${styles.summary} animate-fade-in`} style={{ animationDelay: '0.3s' }}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span style={{ color: 'var(--foreground)', fontWeight: 700 }}>{formattedTotal}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            
            <div className={styles.summaryTotal}>
              <span>Total</span>
              <span>{formattedTotal}</span>
            </div>
            
            <button className={styles.checkoutBtn} onClick={() => alert('Checkout functionality is mocked for this demo.')}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

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
      <>
        <Header />
        <div className={styles.emptyState}>
          <h1 className={styles.emptyTitle}>Your cart is empty</h1>
          <p>Looks like you haven't added any premium gadgets to your cart yet.</p>
          <div style={{ marginTop: '2rem' }}>
            <Link href="/" style={{ backgroundColor: 'var(--foreground)', color: 'var(--background)', padding: '1rem 2rem', borderRadius: '9999px', fontWeight: '600' }}>
              Start Shopping
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>Shopping Cart</h1>
        
        <div className={styles.grid}>
          <div className={styles.cartItems}>
            {cartItems.map(item => (
              <div key={item.id} className={`${styles.item} animate-fade-in`}>
                <div className={styles.imageContainer}>
                  <img src={item.imageUrl} alt={item.title} className={styles.image} />
                </div>
                
                <div className={styles.itemDetails}>
                  <div className={styles.itemHeader}>
                    <h3 className={styles.itemTitle}>{item.title}</h3>
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
          
          <div className={styles.summary}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>{formattedTotal}</span>
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
    </>
  );
}

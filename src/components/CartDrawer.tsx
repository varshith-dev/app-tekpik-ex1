'use client';

import { useCart } from '@/context/CartContext';
import { ShoppingBag, X, Plus, Minus, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const formattedTotal = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(cartTotal);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', zIndex: 999 }}
          />
          <motion.div 
            initial={{ x: '100%', opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0.5 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{ 
              position: 'fixed', top: 0, right: 0, bottom: 0, width: '100%', maxWidth: '450px', 
              backgroundColor: 'var(--background)', zIndex: 1000, display: 'flex', flexDirection: 'column',
              boxShadow: '-20px 0 50px rgba(0,0,0,0.2)', borderLeft: '1px solid var(--border-light)'
            }}
          >
            <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 800, fontSize: '1.25rem' }}>
                <ShoppingBag size={24} /> 
                Your Cart
              </div>
              <button onClick={onClose} style={{ padding: '0.5rem', borderRadius: '50%', backgroundColor: 'var(--background-secondary)', display: 'flex' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ flexGrow: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', marginTop: '4rem', color: 'var(--foreground-muted)' }}>
                  <ShoppingBag size={64} style={{ margin: '0 auto 1.5rem', strokeWidth: 1, opacity: 0.5 }} />
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--foreground)', marginBottom: '0.5rem' }}>Cart is empty</h3>
                  <p>Discover our premium selection and find something you love.</p>
                  <button onClick={onClose} className="btn-primary" style={{ marginTop: '2rem' }}>Start Shopping</button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <motion.div layout key={item.id} style={{ display: 'flex', gap: '1.25rem' }}>
                    <div style={{ width: '80px', height: '80px', borderRadius: '0.75rem', backgroundColor: 'var(--background-secondary)', overflow: 'hidden', flexShrink: 0 }}>
                      <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
                        <h4 style={{ fontWeight: 700, fontSize: '0.9375rem', lineHeight: 1.2, maxWidth: '80%' }}>{item.title}</h4>
                        <button onClick={() => removeFromCart(item.id)} style={{ color: 'var(--foreground-muted)' }}>
                          <X size={16} />
                        </button>
                      </div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.category}</span>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', backgroundColor: 'var(--background-secondary)', padding: '0.25rem', borderRadius: '2rem' }}>
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ padding: '0.25rem', display: 'flex' }}><Minus size={14} /></button>
                          <span style={{ fontSize: '0.875rem', fontWeight: 700, width: '1.5rem', textAlign: 'center' }}>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ padding: '0.25rem', display: 'flex' }}><Plus size={14} /></button>
                        </div>
                        <span style={{ fontWeight: 800 }}>{item.formattedPrice}</span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-light)', backgroundColor: 'var(--glass-bg)', backdropFilter: 'blur(10px)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: 800 }}>
                  <span>Total</span>
                  <span>{formattedTotal}</span>
                </div>
                <button className="btn-primary" style={{ width: '100%', padding: '1.25rem', fontSize: '1.125rem' }} onClick={() => alert('Proceeding to checkout...')}>
                  Checkout <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

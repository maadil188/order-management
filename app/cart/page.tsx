'use client';

import React from 'react';
import Header from '@/components/Header';
import CartList from '@/components/CartList';
import CheckoutForm from '@/components/CheckoutForm';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';
import styles from './cart.module.css';

export default function CartPage() {
  const { cart } = useCart();

  return (
    <main>
      <Header />
      
      <div className="container py-4">
        <div className={styles.headerSection}>
          <h1 className={styles.title}>Your Cart</h1>
          <p className={styles.subtitle}>Review your items and complete your order</p>
        </div>

        {cart.length === 0 ? (
          <div className={`${styles.emptyCard} card text-center fade-in`}>
            <span className={styles.emptyIcon}>🛒</span>
            <h2 className={styles.emptyTitle}>Your cart is empty</h2>
            <p className={styles.emptySubtitle}>
              Looks like you haven&apos;t added anything to your cart yet.
            </p>
            <Link href="/" className="btn btn-primary" style={{ textDecoration: 'none' }}>
              Explore Menu
            </Link>
          </div>
        ) : (
          <div className={styles.layout}>
            <div className="fade-in">
              <CartList />
            </div>
            
            <div className={`fade-in ${styles.stickySide}`} style={{ animationDelay: '0.2s' }}>
              <CheckoutForm />
            </div>
          </div>
        )}
      </div>

      <footer className={styles.footer}>
        <p>© 2026 FoodExpress. Secure Checkout</p>
      </footer>
    </main>
  );
}

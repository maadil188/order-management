'use client';

import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import styles from './Header.module.css';

export default function Header() {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.headerContent}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoIcon}>🍕</span>
            <span className={styles.logoText}>FoodExpress</span>
          </Link>

          <nav className={styles.nav}>
            <Link href="/" className={styles.navLink}>
              Menu
            </Link>
            <Link href="/orders" className={styles.navLink}>
              My Orders
            </Link>
            <Link href="/cart" className={styles.cartLink}>
              <span className={styles.cartIcon}>🛒</span>
              {cartCount > 0 && (
                <span className={styles.cartBadge}>{cartCount}</span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

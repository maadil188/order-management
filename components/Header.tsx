'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import styles from './Header.module.css';

export default function Header() {
  const { getCartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartCount = getCartCount();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.headerContent}>
          <Link href="/" className={styles.logo} onClick={closeMenu}>
            <span className={styles.logoIcon}>🍕</span>
            <span className={styles.logoText}>FoodExpress</span>
          </Link>

          <div className={styles.navWrapper}>
            <nav className={`${styles.nav} ${isMenuOpen ? styles.navActive : ''}`}>
              <Link href="/" className={styles.navLink} onClick={closeMenu}>
                Menu
              </Link>
              <Link href="/orders" className={styles.navLink} onClick={closeMenu}>
                My Orders
              </Link>
              <Link href="/cart" className={styles.cartLink} onClick={closeMenu}>
                <span className={styles.cartIcon}>🛒</span>
                {cartCount > 0 && (
                  <span className={styles.cartBadge}>{cartCount}</span>
                )}
              </Link>
            </nav>

            <button 
              className={`${styles.hamburger} ${isMenuOpen ? styles.active : ''}`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <span className={styles.bar}></span>
              <span className={styles.bar}></span>
              <span className={styles.bar}></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

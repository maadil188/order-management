'use client';

import Image from 'next/image';
import { MenuItem } from '@/types';
import { useCart } from '@/contexts/CartContext';
import styles from './MenuItemCard.module.css';

interface MenuItemCardProps {
  item: MenuItem;
  priority?: boolean;
}

export default function MenuItemCard({ item, priority = false }: MenuItemCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(item, 1);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={item.image}
          alt={item.name}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
        />
        <div className={styles.categoryBadge}>{item.category}</div>
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.title}>{item.name}</h3>
        <p className={styles.description}>{item.description}</p>
        
        <div className={styles.footer}>
          <span className={styles.price}>${item.price.toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            className={styles.addButton}
            aria-label={`Add ${item.name} to cart`}
          >
            <span className={styles.buttonIcon}>+</span>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

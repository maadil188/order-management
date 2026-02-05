'use client';

import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';
import styles from './CartList.module.css';

export default function CartList() {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <span className={styles.emptyIcon}>🛒</span>
        <h3>Your cart is empty</h3>
        <p>Add some delicious items from the menu!</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.itemsList}>
        {cart.map((item) => (
          <div key={item.menuItem.id} className={styles.cartItem}>
            <div className={styles.itemImage}>
              <Image
                src={item.menuItem.image}
                alt={item.menuItem.name}
                fill
                className={styles.image}
              />
            </div>
            
            <div className={styles.itemInfo}>
              <h4 className={styles.itemName}>{item.menuItem.name}</h4>
              <p className={styles.itemPrice}>${item.menuItem.price.toFixed(2)} each</p>
            </div>

            <div className={styles.quantityControls}>
              <button
                onClick={() => updateQuantity(item.menuItem.id, item.quantity - 1)}
                className={styles.qtyBtn}
              >
                -
              </button>
              <span className={styles.quantity}>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)}
                className={styles.qtyBtn}
              >
                +
              </button>
            </div>

            <div className={styles.itemTotal}>
              ${(item.menuItem.price * item.quantity).toFixed(2)}
            </div>

            <button
              onClick={() => removeFromCart(item.menuItem.id)}
              className={styles.removeBtn}
              aria-label="Remove item"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className={styles.summary}>
        <div className={styles.totalRow}>
          <span>Subtotal</span>
          <span>${getCartTotal().toFixed(2)}</span>
        </div>
        <div className={styles.totalRow}>
          <span>Delivery Fee</span>
          <span className={styles.free}>FREE</span>
        </div>
        <div className={`${styles.totalRow} ${styles.grandTotal}`}>
          <span>Total</span>
          <span>${getCartTotal().toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

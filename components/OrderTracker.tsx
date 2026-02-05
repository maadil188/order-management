'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { Order, OrderStatus } from '@/types';
import styles from './OrderTracker.module.css';

interface OrderTrackerProps {
  orderId: string;
}

const statusSteps: OrderStatus[] = [
  'Order Received',
  'Preparing',
  'Out for Delivery',
  'Delivered'
];

export default function OrderTracker({ orderId }: OrderTrackerProps) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrder = useCallback(async () => {
    try {
      const response = await fetch(`/api/orders/${orderId}`);
      const result = await response.json();
      if (result.success) {
        setOrder(result.data);
      } else {
        setError(result.error);
      }
    } catch {
      setError('Failed to fetch order details');
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    fetchOrder();
    
    // Poll every 5 seconds for simulation
    // The server handles status progression in getOrderById
    const interval = setInterval(fetchOrder, 5000);
    return () => clearInterval(interval);
  }, [fetchOrder]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className="spinner"></div>
        <p>Finding your order...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className={styles.error}>
        <h3>Order not found</h3>
        <p>{error || "We couldn't find the order you're looking for."}</p>
      </div>
    );
  }

  const currentStatusIndex = statusSteps.indexOf(order.status);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.orderIdTitle}>Order #{order.id.slice(0, 8)}</h2>
          <p className={styles.orderDate}>
            Placed on {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
        <div className={styles.totalBadge}>
          ${order.total.toFixed(2)}
        </div>
      </div>

      <div className={styles.statusSection}>
        <div className={styles.progressBar}>
          {statusSteps.map((status, index) => {
            const isCompleted = index < currentStatusIndex;
            const isCurrent = index === currentStatusIndex;
            
            return (
              <div key={status} className={styles.stepWrapper}>
                <div className={`${styles.stepCircle} ${isCompleted ? styles.completed : ''} ${isCurrent ? styles.active : ''}`}>
                  {isCompleted ? '✓' : index + 1}
                </div>
                <div className={`${styles.stepLine} ${index === statusSteps.length - 1 ? styles.hideLine : ''} ${isCompleted ? styles.completedLine : ''}`}></div>
                <span className={`${styles.stepLabel} ${isCurrent ? styles.activeLabel : ''}`}>{status}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.detailsGrid}>
        <div className={styles.detailCard}>
          <h4>Items</h4>
          <ul className={styles.itemList}>
            {order.items.map((item, idx) => (
              <li key={idx} className={styles.itemRow}>
                <div className={styles.itemMain}>
                  <div style={{ position: 'relative', width: '50px', height: '50px', marginRight: '1rem', borderRadius: '8px', overflow: 'hidden' }}>
                    <Image 
                      src={item.menuItem.image} 
                      alt={item.menuItem.name} 
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <span>{item.quantity}x {item.menuItem.name}</span>
                </div>
                <span>${(item.menuItem.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.detailCard}>
          <h4>Delivery Address</h4>
          <p className={styles.addressName}>{order.deliveryDetails.name}</p>
          <p className={styles.addressText}>{order.deliveryDetails.address}</p>
          <p className={styles.phoneText}>📞 {order.deliveryDetails.phoneNumber}</p>
        </div>
      </div>
    </div>
  );
}

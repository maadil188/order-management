'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Header from '@/components/Header';
import { Order } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import styles from './OrderList.module.css';

export default function OrdersListPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = useCallback(async () => {
    try {
      const response = await fetch('/api/orders');
      const result = await response.json();
      if (result.success) {
        setOrders(result.data.sort((a: Order, b: Order) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ));
      }
    } catch {
      console.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, [fetchOrders]);

  return (
    <main>
      <Header />
      
      <div className="container py-4">
        <div className={styles.headerSection}>
          <h1 className={styles.title}>All Orders</h1>
          <p className={styles.subtitle}>View and track every order currently in memory</p>
        </div>

        {loading && orders.length === 0 ? (
          <div className="flex justify-center py-4">
            <div className="spinner"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className={`${styles.emptyCard} card text-center fade-in`}>
            <h2 className={styles.emptyTitle}>No orders found</h2>
            <p className={styles.emptySubtitle}>
              Place an order to see it appear here in the in-memory database.
            </p>
            <Link href="/" className="btn btn-primary" style={{ textDecoration: 'none' }}>
              Go to Menu
            </Link>
          </div>
        ) : (
          <div className={styles.grid}>
            {orders.map((order) => (
              <div key={order.id} className={`${styles.orderCard} fade-in`}>
                <div className={styles.cardHeader}>
                  <span className={styles.id}>#{order.id.slice(0, 8)}</span>
                  <span className={`${styles.statusBadge} ${order.status.replace(/\s+/g, '').toLowerCase()}`}>
                    {order.status}
                  </span>
                </div>
                
                <div className={styles.cardBody}>
                  <p><strong>Customer:</strong> {order.deliveryDetails.name}</p>
                  
                  <div className={styles.itemPreviews}>
                    {order.items.slice(0, 3).map((item, i) => (
                      <div key={i} className={styles.thumbnailWrapper}>
                        <div style={{ position: 'relative', width: '40px', height: '40px' }}>
                          <Image 
                            src={item.menuItem.image} 
                            alt={item.menuItem.name} 
                            fill
                            className={styles.thumbnail}
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                        {item.quantity > 1 && <span className={styles.qtyBadge}>{item.quantity}</span>}
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <div className={styles.moreItems}>+{order.items.length - 3}</div>
                    )}
                  </div>

                  <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
                  <p className={styles.date}>{new Date(order.createdAt).toLocaleString()}</p>
                </div>

                <div className={styles.cardFooter}>
                  <Link href={`/orders/${order.id}`} className={styles.trackLink}>
                    Track Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer className={styles.footer}>
        <p>© 2026 FoodExpress. Admin Debug View</p>
      </footer>
    </main>
  );
}

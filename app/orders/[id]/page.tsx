"use client";

import React from "react";
import Header from "@/components/Header";
import OrderTracker from "@/components/OrderTracker";
import { useParams } from "next/navigation";

export default function OrderPage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <main>
      <Header />

      <div className="container py-4 order-detail-page">
        <div className="header-section">
          <h1 className="title">Track Your Order</h1>
          <p className="subtitle">
            Get real-time updates on your delicious meal
          </p>
        </div>

        <div className="fade-in">
          <OrderTracker orderId={id} />
        </div>
      </div>

      <footer className="footer">
        <p>© 2026 FoodExpress. Fast & Fresh Delivery</p>
      </footer>

      <style jsx>{`
        .order-detail-page {
          padding: 2rem 0;
        }
        .header-section {
          margin-bottom: 2rem;
        }
        .title {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
        }
        .subtitle {
          color: var(--text-secondary);
        }
        .footer {
          padding: 4rem 0;
          margin-top: 4rem;
          text-align: center;
          opacity: 0.5;
        }

        @media (max-width: 768px) {
          .order-detail-page {
            padding: 1rem 0;
          }
          .header-section {
            margin-bottom: 2rem;
            text-align: center;
          }
          .title {
            font-size: 2rem;
          }
          .footer {
            padding: 2rem 0;
            margin-top: 2rem;
            font-size: 0.875rem;
          }
        }

        @media (max-width: 480px) {
          .title {
            font-size: 1.75rem;
          }
        }
      `}</style>
    </main>
  );
}

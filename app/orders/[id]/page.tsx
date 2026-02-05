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

      <div className="container py-4">
        <div style={{ marginBottom: "3rem" }}>
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "800",
              marginBottom: "0.5rem",
            }}
          >
            Track Your Order
          </h1>
          <p style={{ color: "var(--text-secondary)" }}>
            Get real-time updates on your delicious meal
          </p>
        </div>

        <div className="fade-in">
          <OrderTracker orderId={id} />
        </div>
      </div>

      <footer
        style={{
          padding: "4rem 0",
          marginTop: "4rem",
          textAlign: "center",
          opacity: 0.5,
        }}
      >
        <p>© 2026 FoodExpress. Fast & Fresh Delivery</p>
      </footer>

      <style jsx>{`
        .py-4 {
          padding: 4rem 0;
        }
      `}</style>
    </main>
  );
}

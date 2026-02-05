import React from "react";
import Header from "@/components/Header";
import MenuGrid from "@/components/MenuGrid";
import { db } from "@/lib/db";
import styles from "./page.module.css";

// This is a Server Component
export default async function Home() {
  // Fetch data directly on the server (mock DB call)
  const menuItems = db.getMenuItems();

  return (
    <main>
      <Header />
      
      <section className={`${styles.hero} fade-in`}>
        <div className="container">
          <h1 className={`${styles.heroTitle} text-gradient`}>
            Craving Something Delicious?
          </h1>
          <p className={styles.heroSubtitle}>
            From crispy pizzas to juicy burgers, we bring the best flavors from
            our kitchen straight to your doorstep.
          </p>
        </div>
      </section>

      {/* Client Component with hydrated data */}
      <MenuGrid initialItems={menuItems} />

      <footer className={styles.footer}>
        <p className={styles.footerText}>
          © 2026 FoodExpress. Built with ❤️ and Next.js
        </p>
      </footer>
    </main>
  );
}

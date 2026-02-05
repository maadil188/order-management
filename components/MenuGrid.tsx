'use client';

import React, { useState } from 'react';
import MenuItemCard from '@/components/MenuItemCard';
import { MenuItem } from '@/types';
import styles from '@/app/page.module.css';

interface MenuGridProps {
  initialItems: MenuItem[];
}

export default function MenuGrid({ initialItems }: MenuGridProps) {
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    ...Array.from(new Set(initialItems.map((item) => item.category))),
  ];

  const filteredItems = category === "All"
    ? initialItems
    : initialItems.filter((item) => item.category === category);

  return (
    <section className="container mb-4">
      <div className={styles.categoryFilters}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`btn ${category === cat ? "btn-primary" : "btn-outline"} ${styles.categoryBtn}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className={styles.menuGrid} style={{ marginTop: '3rem' }}>
        {filteredItems.map((item, idx) => (
          <div key={item.id} className="fade-in" style={{ animationDelay: `${idx * 0.05}s` }}>
            <MenuItemCard 
              item={item} 
              priority={idx < 4} // Priority for first 4 items (above fold)
            />
          </div>
        ))}
      </div>
    </section>
  );
}

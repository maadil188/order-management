# Functional Specification Document (FSD): FoodExpress

## 1. Technical Architecture

The application is built using **Next.js 15** with the **App Router** architecture. It leverages a modern, performance-first approach:

- **Server-side**: Server Components (`app/page.tsx`) fetch data directly from the in-memory store for optimal LCP.
- **Client-side**: Interactive components (filtering, cart, forms) use `use client` directives.
- **API**: Route Handlers (`app/api/*`) for client-side interactions (e.g., placing orders, tracking).

## 2. Data Models (Types)

### 2.1 MenuItem

```typescript
interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}
```

### 2.2 Order

```typescript
interface Order {
  id: string;
  items: CartItem[];
  deliveryDetails: {
    name: string;
    address: string;
    phoneNumber: string;
  };
  total: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

type OrderStatus =
  | "Order Received"
  | "Preparing"
  | "Out for Delivery"
  | "Delivered";
```

## 3. API Specification

### 3.1 Menu API

- **GET `/api/menu`**: Returns a list of all available menu items (used by client components if needed, though initial load is server-rendered).

### 3.2 Orders API

- **POST `/api/orders`**: Create a new order. Validates payload using Zod.
- **GET `/api/orders`**: Fetch list of all orders (ADMIN/Debug view).
- **GET `/api/orders/[id]`**: Fetches details of a specific order. Triggers server-side status simulation logic before returning response.
- **PATCH `/api/orders/[id]`**: Manually update an order status (admin/internal use).

## 4. Key Logic & Simulations

### 4.1 Real-Time Status Simulation

The backend (`lib/db.ts`) acts as the single source of truth. The `getOrderById` and `getAllOrders` methods automatically update an order's status based on elapsed time:

- **0-40 seconds**: Order Received
- **40-80 seconds**: Preparing
- **80-120 seconds**: Out for Delivery
- **> 120 seconds**: Delivered

_Note: Simulation logic was removed from the client to ensure consistency._

### 4.2 Cart State Management

Managed via `CartContext` (`contexts/CartContext.tsx`). Actions include:

- `addToCart(item)`
- `removeFromCart(id)`
- `updateQuantity(id, qty)`
- `clearCart()`

## 5. Component Breakdown

| Component      | Responsibility                                                           | Type   |
| :------------- | :----------------------------------------------------------------------- | :----- |
| `Home (page)`  | Server Component. Fetches menu data directly for fast LCP.               | Server |
| `MenuGrid`     | Client Component. Handles category filtering and responsive grid layout. | Client |
| `Header`       | Navigation and Cart badge display (real-time count).                     | Client |
| `MenuItemCard` | Display individual item. Optimized with `next/image` and CLS prevention. | Client |
| `CartList`     | Line-item view of the cart with quantity controls.                       | Client |
| `CheckoutForm` | Multi-field form with Zod validation and submission logic.               | Client |
| `OrderTracker` | Visual progress bar. Polls API for status updates.                       | Client |

## 6. Testing Strategy

### 6.1 Unit Tests

- Validation schemas (Zod).
- Mock database operations (CRUD).
- Status progression logic (`lib/db.ts`).

### 6.2 Component Tests

- **MenuItemCard**: Verify rendering, `Add to Cart` event, and correct use of `next/image`.
- **OrderTracker**: Verify polling mechanism and status display.

### 6.3 Integration Tests

- Verification of API response codes and data structures.

## 7. Security & Validation

- **Input Sanitization**: All user inputs are parsed through Zod schemas.
- **Edge Cases**: Empty cart checkout prevention, invalid phone number rejection, and 404 handling.

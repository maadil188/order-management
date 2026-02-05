# FoodExpress - Order Management System

A premium food delivery order management feature built with Next.js 15, TypeScript, and TDD.

## 🚀 Features

- **Menu Display**: Vibrant list of food items with categories, descriptions, and pricing.
- **Cart Management**: Add/remove items and adjust quantities.
- **Checkout Flow**: Secure-feeling checkout with form validation (Zod).
- **Real-time Order Tracking**: Dynamic status updates (simulated on the backend).
- **Premium UI**: Dark mode aesthetic with glassmorphism, gradients, and micro-animations.
- **TDD Approach**: Comprehensive test suite covering API, Database, and UI components.

## 🛠️ Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Vanilla CSS (CSS Modules)
- **Validation**: Zod
- **Testing**: Jest & React Testing Library
- **State Management**: React Context API
- **Icons/Fonts**: Google Fonts (Inter)

## 🧪 Testing (TDD)

The project follows Test-Driven Development principles. The test suite includes:

- **Unit Tests**: Database logic and Zod schemas (`__tests__/db_validation.test.ts`).
- **Integration Tests**: API route handlers (`__tests__/api.test.ts`).
- **Component Tests**: Key UI components like `MenuItemCard` and `OrderTracker` (`__tests__/*.test.tsx`).

To run the tests:

```bash
npm test
```

## 🏗️ Architecture & Design Choices

1. **In-Memory Store**: Uses an in-memory database (`lib/db.ts`) for simplicity as per requirements, while maintaining a clean API boundary for future DB integration.
2. **Context API**: Cart state is managed via a dedicated `CartContext`, ensuring efficient updates across the application without prop drilling.
3. **Backend Simulation**: Order progression is simulated in the `db.ts` file based on timestamps, providing a realistic "Preparing" -> "Out for Delivery" flow without needing complex web sockets for this demo.
4. **CSS Modules**: Used for scoped, maintainable styling while keeping the premium "hand-crafted" look of Vanilla CSS.

## 🏁 Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000)

## 📦 Deliverables Note

- **API**: Found in `app/api/`
- **UI**: Components in `components/`, pages in `app/`
- **Tests**: Located in `__tests__/`

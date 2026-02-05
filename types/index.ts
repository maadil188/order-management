// Menu Item Type
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

// Cart Item Type
export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

// Order Status Type
export type OrderStatus =
  | "Order Received"
  | "Preparing"
  | "Out for Delivery"
  | "Delivered";

// Delivery Details Type
export interface DeliveryDetails {
  name: string;
  address: string;
  phoneNumber: string;
}

// Order Type
export interface Order {
  id: string;
  items: CartItem[];
  deliveryDetails: DeliveryDetails;
  total: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

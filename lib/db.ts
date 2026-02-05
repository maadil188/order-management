import { MenuItem, Order, OrderStatus } from '@/types';

// In-memory storage for menu items
const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Margherita Pizza',
    description: 'Classic pizza with fresh mozzarella, tomato sauce, and basil',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&w=800&q=80',
    category: 'Pizza'
  },
  {
    id: '2',
    name: 'Pepperoni Pizza',
    description: 'Loaded with pepperoni and melted mozzarella cheese',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80',
    category: 'Pizza'
  },
  {
    id: '3',
    name: 'Classic Burger',
    description: 'Juicy beef patty with lettuce, tomato, and special sauce',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    category: 'Burgers'
  },
  {
    id: '4',
    name: 'Chicken Burger',
    description: 'Crispy chicken fillet with mayo and fresh vegetables',
    price: 10.99,
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=800&q=80',
    category: 'Burgers'
  },
  {
    id: '5',
    name: 'Caesar Salad',
    description: 'Fresh romaine lettuce with parmesan and Caesar dressing',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=800&q=80',
    category: 'Salads'
  },
  {
    id: '6',
    name: 'Pasta Carbonara',
    description: 'Creamy pasta with bacon, eggs, and parmesan cheese',
    price: 13.99,
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=800&q=80',
    category: 'Pasta'
  },
  {
    id: '7',
    name: 'Tacos',
    description: 'Three soft tacos with seasoned beef and fresh toppings',
    price: 11.99,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
    category: 'Mexican'
  },
  {
    id: '8',
    name: 'Sushi Roll',
    description: 'Fresh salmon and avocado wrapped in seasoned rice',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
    category: 'Japanese'
  }
];

// In-memory storage for orders
const orders: Map<string, Order> = new Map();

/**
 * Helper to update order status based on time elapsed for simulation
 */
function updateStatusIfNecessary(order: Order): Order {
  if (order.status === 'Delivered') return order;

  const now = new Date().getTime();
  const created = new Date(order.createdAt).getTime();
  const secondsElapsed = (now - created) / 1000;

  let newStatus: OrderStatus = order.status;
  
  if (secondsElapsed > 120) {
    newStatus = 'Delivered';
  } else if (secondsElapsed > 80) {
    newStatus = 'Out for Delivery';
  } else if (secondsElapsed > 40) {
    newStatus = 'Preparing';
  }

  if (newStatus !== order.status) {
    order.status = newStatus;
    order.updatedAt = new Date();
    orders.set(order.id, order); // Sync back to storage
  }

  return order;
}

// Database functions
export const db = {
  // Menu operations
  getMenuItems: (): MenuItem[] => {
    return [...menuItems];
  },

  getMenuItemById: (id: string): MenuItem | undefined => {
    return menuItems.find(item => item.id === id);
  },

  // Order operations
  createOrder: (order: Order): Order => {
    orders.set(order.id, order);
    console.log(`📦 New Order Placed! ID: ${order.id}`);
    return order;
  },

  getOrderById: (id: string): Order | undefined => {
    const order = orders.get(id);
    if (!order) return undefined;
    return updateStatusIfNecessary(order);
  },

  getAllOrders: (): Order[] => {
    return Array.from(orders.values()).map(updateStatusIfNecessary);
  },

  updateOrderStatus: (id: string, status: OrderStatus): Order | undefined => {
    const order = orders.get(id);
    if (order) {
      order.status = status;
      order.updatedAt = new Date();
      orders.set(id, order);
      return order;
    }
    return undefined;
  },

  deleteOrder: (id: string): boolean => {
    return orders.delete(id);
  }
};

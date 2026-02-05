import { db } from '../lib/db';
import { createOrderSchema } from '../lib/validation';
import { Order } from '@/types';

describe('Database & Validation', () => {
  beforeEach(() => {
    // Clear orders before each test if needed
    const allOrders = db.getAllOrders();
    allOrders.forEach(o => db.deleteOrder(o.id));
  });

  test('should get menu items', () => {
    const items = db.getMenuItems();
    expect(items.length).toBeGreaterThan(0);
    expect(items[0]).toHaveProperty('name');
  });

  test('should create and retrieve an order', () => {
    const order: Order = {
      id: 'test-id',
      items: [
        {
          menuItem: db.getMenuItems()[0],
          quantity: 2
        }
      ],
      deliveryDetails: {
        name: 'John Doe',
        address: '123 Test St, Test City',
        phoneNumber: '1234567890'
      },
      total: 25.98,
      status: 'Order Received',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    db.createOrder(order);
    const retrieved = db.getOrderById('test-id');
    expect(retrieved).toEqual(order);
  });

  test('should update order status', () => {
    const order: Order = {
      id: 'test-id-2',
      items: [],
      deliveryDetails: {
        name: 'Test',
        address: 'Test Address',
        phoneNumber: '1234567890'
      },
      total: 0,
      status: 'Order Received',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    db.createOrder(order);
    db.updateOrderStatus('test-id-2', 'Preparing');
    
    const updated = db.getOrderById('test-id-2');
    expect(updated?.status).toBe('Preparing');
  });

  test('should validate order data correctly', () => {
    const validOrder = {
      items: [
        {
          menuItem: db.getMenuItems()[0],
          quantity: 1
        }
      ],
      deliveryDetails: {
        name: 'Jane Doe',
        address: '456 Sample Avenue, Suite 100',
        phoneNumber: '9876543210'
      }
    };

    const result = createOrderSchema.safeParse(validOrder);
    expect(result.success).toBe(true);

    const invalidOrder = {
      items: [],
      deliveryDetails: {
        name: 'J',
        address: 'Short',
        phoneNumber: '123'
      }
    };

    const invalidResult = createOrderSchema.safeParse(invalidOrder);
    expect(invalidResult.success).toBe(false);
  });

  test('should handle getAllOrders and deleteOrder', () => {
    // Add two orders
    const o1: Order = { id: 'o1', items: [], deliveryDetails: { name: '', address: '', phoneNumber: '' }, total: 0, status: 'Order Received', createdAt: new Date(), updatedAt: new Date() };
    const o2: Order = { id: 'o2', items: [], deliveryDetails: { name: '', address: '', phoneNumber: '' }, total: 0, status: 'Order Received', createdAt: new Date(), updatedAt: new Date() };
    
    db.createOrder(o1);
    db.createOrder(o2);
    
    expect(db.getAllOrders().length).toBe(2);
    
    db.deleteOrder('o1');
    expect(db.getAllOrders().length).toBe(1);
    expect(db.getOrderById('o1')).toBeUndefined();
  });
});


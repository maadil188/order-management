import { z } from 'zod';

// Delivery Details validation schema
export const deliveryDetailsSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  address: z.string().min(10, 'Address must be at least 10 characters'),
  phoneNumber: z.string().regex(/^\d{10}$/, 'Phone number must be 10 digits')
});

// Cart Item validation schema
export const cartItemSchema = z.object({
  menuItem: z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    price: z.number().positive(),
    image: z.string(),
    category: z.string()
  }),
  quantity: z.number().int().positive()
});

// Order creation validation schema
export const createOrderSchema = z.object({
  items: z.array(cartItemSchema).min(1, 'Cart must have at least one item'),
  deliveryDetails: deliveryDetailsSchema
});

// Order status update validation schema
export const updateOrderStatusSchema = z.object({
  status: z.enum(['Order Received', 'Preparing', 'Out for Delivery', 'Delivered'])
});

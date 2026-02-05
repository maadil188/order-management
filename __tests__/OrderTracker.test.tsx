import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import OrderTracker from '../components/OrderTracker';

// Mock fetch
global.fetch = jest.fn();

const mockOrder = {
  id: 'test-order-id',
  items: [
    { menuItem: { name: 'Pizza', price: 10 }, quantity: 1 }
  ],
  deliveryDetails: {
    name: 'John Doe',
    address: '123 Main St',
    phoneNumber: '1234567890'
  },
  total: 10,
  status: 'Order Received',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

describe('OrderTracker', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  test('renders loading state initially', () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve({ success: true, data: mockOrder })
    });

    render(<OrderTracker orderId="test-order-id" />);
    expect(screen.getByText('Finding your order...')).toBeInTheDocument();
  });

  test('renders order details after fetching', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve({ success: true, data: mockOrder })
    });

    render(<OrderTracker orderId="test-order-id" />);

    await waitFor(() => {
      expect(screen.getByText(/Order #test-ord/i)).toBeInTheDocument();
    });

    expect(screen.getByText('Order Received')).toHaveClass('activeLabel');
    expect(screen.getByText('1x Pizza')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  test('shows error message if order not found', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve({ success: false, error: 'Order not found' })
    });

    render(<OrderTracker orderId="wrong-id" />);

    await waitFor(() => {
      expect(screen.getAllByText(/Order not found/i)[0]).toBeInTheDocument();
    });
  });
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MenuItemCard from '../components/MenuItemCard';


const mockItem = {
  id: '1',
  name: 'Test Pizza',
  description: 'A delicious test pizza',
  price: 10.99,
  image: 'https://example.com/pizza.jpg',
  category: 'Pizza'
};

const mockAddToCart = jest.fn();
const mockRemoveFromCart = jest.fn();
const mockUpdateQuantity = jest.fn();

jest.mock('../contexts/CartContext', () => ({
  useCart: () => ({
    addToCart: mockAddToCart,
    removeFromCart: mockRemoveFromCart,
    updateQuantity: mockUpdateQuantity,
    cart: [],
    getCartTotal: () => 0,
    clearCart: jest.fn()
  })
}));




describe('MenuItemCard', () => {
  test('renders item details correctly', () => {
    render(
      <MenuItemCard item={mockItem} />
    );

    expect(screen.getByText('Test Pizza')).toBeInTheDocument();
    expect(screen.getByText('A delicious test pizza')).toBeInTheDocument();
    expect(screen.getByText('$10.99')).toBeInTheDocument();
  });

  test('calls addToCart when "Add to Cart" is clicked', () => {
    render(
      <MenuItemCard item={mockItem} />
    );

    const addButton = screen.getByText('Add to Cart');
    fireEvent.click(addButton);

    expect(mockAddToCart).toHaveBeenCalledWith(mockItem, 1);
  });

});

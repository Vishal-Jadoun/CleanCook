import { useContext } from 'react';
import { ShoppingContext } from '../context/shoppingContextInstance';

export const useShopping = () => {
  const context = useContext(ShoppingContext);
  if (!context) {
    throw new Error('useShopping must be used within a ShoppingProvider');
  }
  return context;
};

export default useShopping;

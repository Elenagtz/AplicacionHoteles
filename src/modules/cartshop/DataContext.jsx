
import React, { createContext, useState } from 'react';

export const DataContext = createContext();


export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const updateCartItem = (updatedItem) => {
    const updatedCartItems = cartItems.map(item => item.id_producto === updatedItem.id_producto ? updatedItem : item);
    setCartItems(updatedCartItems);
  };

  const removeCartItem = (itemToRemove) => {
    setCartItems(prevCartItems => prevCartItems.filter(item => item.id_producto !== itemToRemove.id_producto));
  };

  return (
    <DataContext.Provider value={{ cartItems, addItemToCart, removeCartItem,updateCartItem }}>
      {children}
    </DataContext.Provider>
  );
};

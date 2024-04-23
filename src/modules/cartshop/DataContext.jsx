
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const DataContext = createContext();




export const CartProvider = ({ children, ...props }) => {
  const [cartItems, setCartItems] = useState([]);
  const {setUpdate}=props;

  useEffect(() => {
    // Cargar elementos del carrito desde AsyncStorage al iniciar la aplicación
    const loadCartItems = async () => {
      try {
        const storedCartItems = await AsyncStorage.getItem('cartItems');
        console.log('tiene', storedCartItems);
        if (storedCartItems) {
          setCartItems(JSON.parse(storedCartItems));
        }
      } catch (error) {
        console.error('Error al cargar elementos del carrito:', error);
      } 
    };
    loadCartItems();
  }, []);

  const saveCartItems = async (items) => {
    try {
      await AsyncStorage.setItem('cartItems', JSON.stringify(items));
    } catch (error) {
      console.error('Error al guardar elementos del carrito:', error);
    }
  };

  const addItemToCart = (item) => {
    const newCartItems = [...cartItems, item];
    setCartItems(newCartItems);
    saveCartItems(newCartItems);
    console.log('`setUpdate` value after adding item:', props.setUpdate);

  };

  const updateCartItem = (updatedItem) => {
    const updatedCartItems = cartItems.map(item => item.id_producto === updatedItem.id_producto ? updatedItem : item);
    setCartItems(updatedCartItems);
    saveCartItems(updatedCartItems);
  };

  const removeCartItem = (itemToRemove) => {
    const updatedCartItems = cartItems.filter(item => item.id_producto !== itemToRemove.id_producto);
    setCartItems(updatedCartItems);
    saveCartItems(updatedCartItems);
  };

  return (
    <DataContext.Provider setUpdate={setUpdate} value={{ cartItems, addItemToCart, removeCartItem, updateCartItem }}>
      {children}
    </DataContext.Provider>
  );
};
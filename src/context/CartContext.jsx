import React, { createContext, useContext, useState } from 'react';

export const CartContext = createContext();

const InicialCart = JSON.parse(localStorage.getItem("carrito")) || [];

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(InicialCart);

  const addToCart = (item, cant) => {

    const addedItem = {...item, cant}

    const newCart = [...cart];
    
    const inCart = newCart.find((prod) => prod.id === addedItem.id);
    
    if (inCart) {

      inCart.cant += cant;
    
    } else {
      
      newCart.push(addedItem);
    
    }
    setCart(newCart);
  }

  const cantCart = () => {
    return cart.reduce((cantidad, item) => cantidad + item.cant, 0);
  }

  const emptyTheCart = () => {
    
    setCart([]);
  };

  const getTotalPrice = () => {
    
    return cart.reduce((total, item) => total + item.price* item.cant, 0);
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      emptyTheCart, 
      getTotalPrice, 
      cantCart }}>
      {children}
    </CartContext.Provider>
  );
};


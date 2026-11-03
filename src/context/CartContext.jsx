// Shared cart state: the cart items plus the functions that change them.
import { createContext, useContext, useState } from 'react';

const CartContext = createContext(null);

const MAX_QUANTITY = 20;

export function CartProvider({ children }) {
  // Each cart item is a menu item plus a quantity: { ...menuItem, quantity }
  const [cartItems, setCartItems] = useState([]);

  // Add a dish, or increase its quantity if it is already in the cart.
  const addToCart = (item) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItem) {
        return currentItems.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity: Math.min(cartItem.quantity + 1, MAX_QUANTITY),
              }
            : cartItem
        );
      }

      return [...currentItems, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((currentItems) =>
      currentItems.filter((cartItem) => cartItem.id !== id)
    );
  };

  // A quantity below 1 removes the item; the maximum is 20.
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
      return;
    }

    setCartItems((currentItems) =>
      currentItems.map((cartItem) =>
        cartItem.id === id
          ? { ...cartItem, quantity: Math.min(newQuantity, MAX_QUANTITY) }
          : cartItem
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Derived values: calculated from cartItems, not stored in state.
  const totalItems = cartItems.reduce(
    (sum, cartItem) => sum + cartItem.quantity,
    0
  );

  const totalPrice = cartItems.reduce(
    (sum, cartItem) => sum + cartItem.price * cartItem.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  return useContext(CartContext);
}
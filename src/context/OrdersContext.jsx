// Shared list of placed orders. Customers add orders; the admin updates their status.
import { createContext, useContext, useState } from 'react';

const OrdersContext = createContext(null);

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState([]);

  // Saves a new order and returns it, so the checkout page can show a confirmation.
  const placeOrder = (details) => {
    const newOrder = {
      id: 1001 + orders.length, // order numbers start at 1001
      ...details,
      status: 'Received',
      placedAt: new Date().toISOString(),
    };

    // Newest order goes first in the list.
    setOrders((currentOrders) => [newOrder, ...currentOrders]);

    return newOrder;
  };

  // Changes the status of one order (used by the admin Orders page).
  const updateOrderStatus = (id, status) => {
    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === id ? { ...order, status } : order
      )
    );
  };

  return (
    <OrdersContext.Provider value={{ orders, placeOrder, updateOrderStatus }}>
      {children}
    </OrdersContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useOrders() {
  return useContext(OrdersContext);
}
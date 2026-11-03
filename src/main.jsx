// Entry point: supplies routing and shared state before mounting the app.
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { MenuProvider } from './context/MenuContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { OrdersProvider } from './context/OrdersContext.jsx';
import { ReservationsProvider } from './context/ReservationsContext.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <MenuProvider>
          <CartProvider>
            <OrdersProvider>
              <ReservationsProvider>
                <App />
              </ReservationsProvider>
            </OrdersProvider>
          </CartProvider>
        </MenuProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
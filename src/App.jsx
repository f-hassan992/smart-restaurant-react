// Route map: separates customer pages from protected administration routes.
import { Route, Routes } from 'react-router-dom';
import CustomerLayout from './layouts/CustomerLayout.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';
import ProtectedRoute from './components/common/ProtectedRoute.jsx';

import Home from './pages/customer/Home.jsx';
import Menu from './pages/customer/Menu.jsx';
import Cart from './pages/customer/Cart.jsx';
import Checkout from './pages/customer/Checkout.jsx';
import Reservations from './pages/customer/Reservations.jsx';
import Chat from './pages/customer/Chat.jsx';
import Login from './pages/customer/Login.jsx';
import OrderHistory from './pages/customer/OrderHistory.jsx';

import Dashboard from './pages/admin/Dashboard.jsx';
import AdminMenu from './pages/admin/AdminMenu.jsx';
import AdminOrders from './pages/admin/AdminOrders.jsx';
import AdminReservations from './pages/admin/AdminReservations.jsx';

function App() {
  return (
    <Routes>
      <Route element={<CustomerLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/orders" element={<OrderHistory />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="menu" element={<AdminMenu />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route
            path="reservations"
            element={<AdminReservations />}
          />
        </Route>
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

function PageNotFound() {
  return (
    <main className="page-main page-title">
      <h1>Page not found</h1>
    </main>
  );
}

export default App;
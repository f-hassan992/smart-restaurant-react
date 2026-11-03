// Shared shell for customer pages.
import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar.jsx';
import Footer from '../components/common/Footer.jsx';

function CustomerLayout() {
  return (
    <div className="app-shell">
      <Navbar />

      <main className="page-main">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default CustomerLayout;
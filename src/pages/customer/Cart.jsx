// Shows the cart contents and totals; checkout logic comes in Step 4.
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';
import CartItem from '../../components/cart/CartItem.jsx';

function Cart() {
  const { cartItems, clearCart, totalItems, totalPrice } = useCart();

  return (
    <section className="cart-page">
      <header className="cart-heading">
        <h1>Cart</h1>
      </header>

      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is empty.</p>
          <Link to="/menu">Browse the menu</Link>
        </div>
      ) : (
        <div className="cart-layout">
          <ul className="cart-list">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </ul>

          <aside className="cart-summary">
            <h2>Order summary</h2>

            <p className="cart-summary-line">
              <span>Items</span>
              <span>{totalItems}</span>
            </p>

            <p className="cart-summary-line cart-total">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </p>

            <div className="cart-actions">
              <Link className="cart-checkout" to="/checkout">
                Proceed to Checkout
              </Link>

              <button
                className="cart-clear"
                type="button"
                onClick={clearCart}
              >
                Clear cart
              </button>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
}

export default Cart;
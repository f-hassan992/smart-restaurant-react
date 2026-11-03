// Checkout form with validation. A valid order is saved in OrdersContext and the cart is cleared.
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';
import { useOrders } from '../../context/OrdersContext.jsx';
import OrderCard from '../../components/orders/OrderCard.jsx';

const emptyForm = {
  name: '',
  phone: '',
  orderType: 'pickup',
  address: '',
  notes: '',
};

// Returns an object with one message for each invalid field.
function validate(form) {
  const errors = {};

  if (form.name.trim().length < 2) {
    errors.name = 'Please enter your name.';
  }

  const phoneDigits = form.phone.replace(/\D/g, '');
  if (phoneDigits.length < 10) {
    errors.phone = 'Please enter a phone number with at least 10 digits.';
  }

  if (form.orderType === 'delivery' && form.address.trim().length < 5) {
    errors.address = 'Please enter your delivery address.';
  }

  return errors;
}

function Checkout() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const { placeOrder } = useOrders();

  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  // One handler for every input: the input's name matches a key in the form object.
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = validate(form);
    setErrors(newErrors);

    // Stop here if any field has an error.
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const order = placeOrder({
      customerName: form.name.trim(),
      phone: form.phone.trim(),
      orderType: form.orderType,
      address: form.orderType === 'delivery' ? form.address.trim() : '',
      notes: form.notes.trim(),
      items: cartItems.map(({ id, name, price, quantity }) => ({
        id,
        name,
        price,
        quantity,
      })),
      total: totalPrice,
    });

    clearCart();
    setConfirmedOrder(order);
  };

  // 1) After placing the order: show the confirmation.
  if (confirmedOrder) {
    return (
      <section className="checkout-page">
        <header className="checkout-heading">
          <h1>Order placed</h1>
        </header>

        <p className="confirmation-message">
          Thank you, {confirmedOrder.customerName}! Your order has been
          received.
        </p>

        <OrderCard order={confirmedOrder} />

        <div className="confirmation-actions">
          <Link to="/orders">View order history</Link>
          <Link to="/menu">Back to the menu</Link>
        </div>
      </section>
    );
  }

  // 2) Nothing to check out.
  if (cartItems.length === 0) {
    return (
      <section className="checkout-page">
        <header className="checkout-heading">
          <h1>Checkout</h1>
        </header>

        <div className="cart-empty">
          <p>Your cart is empty.</p>
          <Link to="/menu">Browse the menu</Link>
        </div>
      </section>
    );
  }

  // 3) The checkout form.
  return (
    <section className="checkout-page">
      <header className="checkout-heading">
        <h1>Checkout</h1>
      </header>

      <div className="checkout-layout">
        <form
          className="checkout-form"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="form-field">
            <label htmlFor="name">Full name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <p className="form-error" id="name-error">
                {errors.name}
              </p>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="phone">Phone number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
            />
            {errors.phone && (
              <p className="form-error" id="phone-error">
                {errors.phone}
              </p>
            )}
          </div>

          <fieldset className="form-field order-type">
            <legend>Order type</legend>

            <label>
              <input
                type="radio"
                name="orderType"
                value="pickup"
                checked={form.orderType === 'pickup'}
                onChange={handleChange}
              />
              Pickup
            </label>

            <label>
              <input
                type="radio"
                name="orderType"
                value="delivery"
                checked={form.orderType === 'delivery'}
                onChange={handleChange}
              />
              Delivery
            </label>
          </fieldset>

          {/* The address field only appears for delivery orders. */}
          {form.orderType === 'delivery' && (
            <div className="form-field">
              <label htmlFor="address">Delivery address</label>
              <input
                id="address"
                name="address"
                type="text"
                value={form.address}
                onChange={handleChange}
                aria-invalid={Boolean(errors.address)}
                aria-describedby={
                  errors.address ? 'address-error' : undefined
                }
              />
              {errors.address && (
                <p className="form-error" id="address-error">
                  {errors.address}
                </p>
              )}
            </div>
          )}

          <div className="form-field">
            <label htmlFor="notes">Notes (optional)</label>
            <textarea
              id="notes"
              name="notes"
              value={form.notes}
              onChange={handleChange}
            />
          </div>

          <button className="checkout-submit" type="submit">
            Place order
          </button>
        </form>

        <aside className="cart-summary">
          <h2>Your order</h2>

          <ul className="checkout-items">
            {cartItems.map((item) => (
              <li key={item.id}>
                <span>
                  {item.quantity} × {item.name}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>

          <p className="cart-summary-line cart-total">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </p>
        </aside>
      </div>
    </section>
  );
}

export default Checkout;
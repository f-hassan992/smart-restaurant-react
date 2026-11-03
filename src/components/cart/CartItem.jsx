// One row of the cart: quantity controls, line total, and a remove button.
import { useCart } from '../../context/CartContext.jsx';

function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <li className="cart-row">
      <div className="cart-row-info">
        <h2>{item.name}</h2>
        <p className="cart-unit-price">${item.price.toFixed(2)} each</p>
      </div>

      <div className="quantity-controls">
        <button
          className="quantity-button"
          type="button"
          aria-label={`Decrease quantity of ${item.name}`}
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
        >
          −
        </button>

        <span aria-live="polite">{item.quantity}</span>

        <button
          className="quantity-button"
          type="button"
          aria-label={`Increase quantity of ${item.name}`}
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
        >
          +
        </button>
      </div>

      <span className="cart-line-total">
        ${(item.price * item.quantity).toFixed(2)}
      </span>

      <button
        className="cart-remove"
        type="button"
        aria-label={`Remove ${item.name} from the cart`}
        onClick={() => removeFromCart(item.id)}
      >
        Remove
      </button>
    </li>
  );
}

export default CartItem;
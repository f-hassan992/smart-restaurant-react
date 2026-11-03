// Displays one menu item using data received through props.
import { useCart } from '../../context/CartContext.jsx';

function MenuItemCard({ item }) {
  const { addToCart } = useCart();

  return (
    <article className={`menu-card${item.available ? '' : ' sold-out'}`}>
      <div className="menu-card-heading">
        <h2>{item.name}</h2>

        {!item.available && (
          <span className="sold-out-label">Sold out</span>
        )}
      </div>

      <p>{item.description}</p>

      <p className="menu-ingredients">
        <strong>Ingredients:</strong> {item.ingredients.join(', ')}
      </p>

      {item.dietary.length > 0 && (
        <ul className="dietary-tags" aria-label="Dietary information">
          {item.dietary.map((tag) => (
            <li className="dietary-tag" key={tag}>
              {tag}
            </li>
          ))}
        </ul>
      )}

      <div className="menu-card-footer">
        <span className="menu-price">
          ${item.price.toFixed(2)}
        </span>

        <button
          className="menu-button"
          type="button"
          disabled={!item.available}
          onClick={() => addToCart(item)}
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export default MenuItemCard;
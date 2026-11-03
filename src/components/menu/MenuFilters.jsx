// Controlled filter inputs; all filter state belongs to the Menu page.
import { categories } from '../../data/menuData.js';

function MenuFilters({
  searchText,
  onSearchChange,
  category,
  onCategoryChange,
  dietary,
  onDietaryChange,
  maxPrice,
  onMaxPriceChange,
  onClear,
}) {
  return (
    <div className="menu-filters">
      <div className="menu-filter menu-search">
        <label htmlFor="menu-search">Search menu</label>

        <input
          id="menu-search"
          type="text"
          placeholder="Search by name or ingredient"
          value={searchText}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>

      <div className="menu-filter">
        <label htmlFor="menu-category">Category</label>

        <select
          id="menu-category"
          value={category}
          onChange={(event) => onCategoryChange(event.target.value)}
        >
          {categories.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="menu-filter">
        <label htmlFor="menu-dietary">Dietary preference</label>

        <select
          id="menu-dietary"
          value={dietary}
          onChange={(event) => onDietaryChange(event.target.value)}
        >
          <option value="">All</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="gluten-free">Gluten-free</option>
          <option value="dairy-free">Dairy-free</option>
        </select>
      </div>

      <div className="menu-filter">
        <label htmlFor="menu-max-price">Maximum price</label>

        <select
          id="menu-max-price"
          value={maxPrice}
          onChange={(event) => onMaxPriceChange(event.target.value)}
        >
          <option value="">Any</option>

          {[10, 15, 20, 25].map((price) => (
            <option key={price} value={price}>
              ${price}
            </option>
          ))}
        </select>
      </div>

      <button
        className="menu-clear"
        type="button"
        onClick={onClear}
      >
        Clear filters
      </button>
    </div>
  );
}

export default MenuFilters;
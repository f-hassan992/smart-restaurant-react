// Owns filter state and displays matching items from the shared menu.
import { useState } from 'react';
import { useMenu } from '../../context/MenuContext.jsx';
import MenuFilters from '../../components/menu/MenuFilters.jsx';
import MenuItemCard from '../../components/menu/MenuItemCard.jsx';

function Menu() {
  const { menuItems } = useMenu();

  const [searchText, setSearchText] = useState('');
  const [category, setCategory] = useState('All');
  const [dietary, setDietary] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const search = searchText.trim().toLowerCase();

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search) ||
      item.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(search)
      );

    const matchesCategory =
      category === 'All' || item.category === category;

    const matchesDietary =
      dietary === '' || item.dietary.includes(dietary);

    const matchesPrice =
      maxPrice === '' || item.price <= Number(maxPrice);

    return (
      matchesSearch &&
      matchesCategory &&
      matchesDietary &&
      matchesPrice
    );
  });

  const clearFilters = () => {
    setSearchText('');
    setCategory('All');
    setDietary('');
    setMaxPrice('');
  };

  return (
    <section className="menu-page">
      <header className="menu-heading">
        <h1>Menu</h1>
      </header>

      <MenuFilters
        searchText={searchText}
        onSearchChange={setSearchText}
        category={category}
        onCategoryChange={setCategory}
        dietary={dietary}
        onDietaryChange={setDietary}
        maxPrice={maxPrice}
        onMaxPriceChange={setMaxPrice}
        onClear={clearFilters}
      />

      <p className="menu-count" role="status">
        Showing {filteredItems.length} of {menuItems.length} dishes
      </p>

      {filteredItems.length > 0 ? (
        <div className="menu-grid">
          {filteredItems.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p className="menu-empty">
          No dishes match your filters.
        </p>
      )}
    </section>
  );
}

export default Menu;
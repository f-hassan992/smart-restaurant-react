// One form for both adding a new dish and editing an existing one.
import { useState } from 'react';
import { categories } from '../../data/menuData.js';

const dietaryOptions = ['vegetarian', 'vegan', 'gluten-free', 'dairy-free'];

// The category list without the "All" filter option.
const categoryOptions = categories.filter((category) => category !== 'All');

// "milk, eggs, sugar" becomes ["milk", "eggs", "sugar"].
function splitIngredients(text) {
  return text
    .split(',')
    .map((ingredient) => ingredient.trim())
    .filter((ingredient) => ingredient !== '');
}

// Empty form for a new dish, or the existing values when editing.
function getInitialForm(item) {
  if (!item) {
    return {
      name: '',
      category: categoryOptions[0],
      description: '',
      ingredients: '',
      price: '',
      dietary: [],
      available: true,
    };
  }

  return {
    name: item.name,
    category: item.category,
    description: item.description,
    ingredients: item.ingredients.join(', '),
    price: String(item.price),
    dietary: item.dietary,
    available: item.available,
  };
}

// Returns an object with one message for each invalid field.
function validate(form) {
  const errors = {};

  if (form.name.trim().length < 2) {
    errors.name = 'Please enter a dish name.';
  }

  if (form.description.trim().length < 10) {
    errors.description =
      'Please enter a short description (at least 10 characters).';
  }

  if (splitIngredients(form.ingredients).length === 0) {
    errors.ingredients =
      'Please enter at least one ingredient, separated by commas.';
  }

  const price = Number(form.price);
  if (form.price.trim() === '' || Number.isNaN(price) || price <= 0) {
    errors.price = 'Please enter a price greater than 0.';
  }

  return errors;
}

function MenuForm({ item, onSave, onCancel }) {
  const [form, setForm] = useState(() => getInitialForm(item));
  const [errors, setErrors] = useState({});

  // One handler for the text, number and select inputs.
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  };

  // Adds the tag if it is missing, removes it if it is already selected.
  const toggleDietary = (tag) => {
    setForm((currentForm) => ({
      ...currentForm,
      dietary: currentForm.dietary.includes(tag)
        ? currentForm.dietary.filter((existing) => existing !== tag)
        : [...currentForm.dietary, tag],
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = validate(form);
    setErrors(newErrors);

    // Stop here if any field has an error.
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    onSave({
      name: form.name.trim(),
      category: form.category,
      description: form.description.trim(),
      ingredients: splitIngredients(form.ingredients),
      price: Math.round(Number(form.price) * 100) / 100,
      dietary: form.dietary,
      available: form.available,
    });
  };

  return (
    <form
      className="checkout-form menu-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <h2>{item ? 'Edit menu item' : 'Add menu item'}</h2>

      <div className="form-field">
        <label htmlFor="menu-name">Dish name</label>
        <input
          id="menu-name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'menu-name-error' : undefined}
        />
        {errors.name && (
          <p className="form-error" id="menu-name-error">
            {errors.name}
          </p>
        )}
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="menu-category">Category</label>
          <select
            id="menu-category"
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            {categoryOptions.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="menu-price">Price ($)</label>
          <input
            id="menu-price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            aria-invalid={Boolean(errors.price)}
            aria-describedby={errors.price ? 'menu-price-error' : undefined}
          />
          {errors.price && (
            <p className="form-error" id="menu-price-error">
              {errors.price}
            </p>
          )}
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="menu-description">Description</label>
        <textarea
          id="menu-description"
          name="description"
          value={form.description}
          onChange={handleChange}
          aria-invalid={Boolean(errors.description)}
          aria-describedby={
            errors.description ? 'menu-description-error' : undefined
          }
        />
        {errors.description && (
          <p className="form-error" id="menu-description-error">
            {errors.description}
          </p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="menu-ingredients">
          Ingredients (separated by commas)
        </label>
        <input
          id="menu-ingredients"
          name="ingredients"
          type="text"
          value={form.ingredients}
          onChange={handleChange}
          aria-invalid={Boolean(errors.ingredients)}
          aria-describedby={
            errors.ingredients ? 'menu-ingredients-error' : undefined
          }
        />
        {errors.ingredients && (
          <p className="form-error" id="menu-ingredients-error">
            {errors.ingredients}
          </p>
        )}
      </div>

      <fieldset className="form-field order-type">
        <legend>Dietary tags</legend>

        {dietaryOptions.map((tag) => (
          <label key={tag}>
            <input
              type="checkbox"
              checked={form.dietary.includes(tag)}
              onChange={() => toggleDietary(tag)}
            />
            {tag}
          </label>
        ))}
      </fieldset>

      <fieldset className="form-field order-type">
        <legend>Availability</legend>

        <label>
          <input
            type="checkbox"
            checked={form.available}
            onChange={(event) =>
              setForm((currentForm) => ({
                ...currentForm,
                available: event.target.checked,
              }))
            }
          />
          Available to order
        </label>
      </fieldset>

      <div className="confirmation-actions">
        <button className="checkout-submit" type="submit">
          {item ? 'Save changes' : 'Add to menu'}
        </button>

        <button className="menu-clear" type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default MenuForm;
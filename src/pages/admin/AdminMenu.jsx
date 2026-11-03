// Admin menu management: list, add, edit, delete, and availability toggle.
import { useState } from 'react';
import { useMenu } from '../../context/MenuContext.jsx';
import MenuForm from '../../components/admin/MenuForm.jsx';

function AdminMenu() {
  const {
    menuItems,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    toggleAvailability,
  } = useMenu();

  const [formOpen, setFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null); // null means "adding a new dish"
  const [message, setMessage] = useState('');

  const openAddForm = () => {
    setEditingItem(null);
    setFormOpen(true);
    setMessage('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openEditForm = (item) => {
    setEditingItem(item);
    setFormOpen(true);
    setMessage('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingItem(null);
  };

  // The same form saves both a new dish and an edited one.
  const handleSave = (data) => {
    if (editingItem) {
      updateMenuItem(editingItem.id, data);
      setMessage(`"${data.name}" was updated.`);
    } else {
      addMenuItem(data);
      setMessage(`"${data.name}" was added to the menu.`);
    }

    closeForm();
  };

  const handleDelete = (item) => {
    if (window.confirm(`Delete "${item.name}" from the menu?`)) {
      deleteMenuItem(item.id);
      setMessage(`"${item.name}" was deleted.`);
    }
  };

  const handleToggle = (item) => {
    toggleAvailability(item.id);
    setMessage(
      `"${item.name}" is now ${item.available ? 'sold out' : 'available'}.`
    );
  };

  return (
    <section className="admin-page">
      <header className="admin-heading">
        <h1>Menu management</h1>

        <button
          className="admin-primary-button"
          type="button"
          onClick={openAddForm}
        >
          Add menu item
        </button>
      </header>

      {message && (
        <p className="admin-message" role="status">
          {message}
        </p>
      )}

      {formOpen && (
        <div className="menu-form-panel">
          <MenuForm
            key={editingItem ? editingItem.id : 'new'}
            item={editingItem}
            onSave={handleSave}
            onCancel={closeForm}
          />
        </div>
      )}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {menuItems.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>
                  <button
                    className={`availability-toggle${
                      item.available ? '' : ' is-off'
                    }`}
                    type="button"
                    aria-label={`Change availability of ${item.name}`}
                    onClick={() => handleToggle(item)}
                  >
                    {item.available ? 'Available' : 'Sold out'}
                  </button>
                </td>
                <td>
                  <div className="admin-actions">
                    <button
                      className="admin-link-button"
                      type="button"
                      onClick={() => openEditForm(item)}
                    >
                      Edit
                    </button>

                    <button
                      className="admin-link-button danger"
                      type="button"
                      onClick={() => handleDelete(item)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default AdminMenu;
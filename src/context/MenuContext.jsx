// Shared menu state. menuData.js only provides the starting items;
// the admin pages change this list and the customer Menu page reads it.
import { createContext, useContext, useState } from 'react';
import { menuItems as initialMenuItems } from '../data/menuData.js';

const MenuContext = createContext(null);

export function MenuProvider({ children }) {
  const [menuItems, setMenuItems] = useState(initialMenuItems);

  // Create: the new item gets the next free id.
  const addMenuItem = (details) => {
    setMenuItems((currentItems) => {
      const nextId =
        currentItems.reduce((max, item) => Math.max(max, item.id), 0) + 1;

      return [...currentItems, { id: nextId, ...details }];
    });
  };

  // Update: only the item with this id gets the new values.
  const updateMenuItem = (id, changes) => {
    setMenuItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, ...changes } : item
      )
    );
  };

  // Delete: keep every item except this one.
  const deleteMenuItem = (id) => {
    setMenuItems((currentItems) =>
      currentItems.filter((item) => item.id !== id)
    );
  };

  // Flips available between true and false.
  const toggleAvailability = (id) => {
    setMenuItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, available: !item.available } : item
      )
    );
  };

  return (
    <MenuContext.Provider
      value={{
        menuItems,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        toggleAvailability,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useMenu() {
  return useContext(MenuContext);
}
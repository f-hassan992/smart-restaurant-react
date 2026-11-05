// Accounts kept in memory. Demo only: there is no real security,
// and passwords are never shared outside this file.
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

// A ready-made admin account so the admin area can be demonstrated.
const initialUsers = [
  {
    id: 1,
    name: 'Restaurant Admin',
    email: 'admin@restaurant.com',
    password: 'admin123',
    phone: '',
    dietary: '',
    role: 'admin',
  },
];

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(initialUsers);
  const [currentUserId, setCurrentUserId] = useState(null);

  const account = users.find((u) => u.id === currentUserId);

  // The rest of the app receives the user WITHOUT the password.
  const user = account
    ? {
        id: account.id,
        name: account.name,
        email: account.email,
        phone: account.phone,
        dietary: account.dietary,
        role: account.role,
      }
    : null;

  const role = user ? user.role : null;

  // Creates a customer account and logs in. Returns { ok } or { ok, error }.
  const register = ({ name, email, phone, dietary, password }) => {
    const cleanEmail = email.trim().toLowerCase();

    if (users.some((u) => u.email === cleanEmail)) {
      return {
        ok: false,
        error: 'An account with this email already exists.',
      };
    }

    const newUser = {
      id: users.reduce((max, u) => Math.max(max, u.id), 0) + 1,
      name: name.trim(),
      email: cleanEmail,
      password,
      phone: phone.trim(),
      dietary,
      role: 'customer',
    };

    setUsers((currentUsers) => [...currentUsers, newUser]);
    setCurrentUserId(newUser.id);

    return { ok: true };
  };

  // Checks the email and password. Returns { ok, role } or { ok, error }.
  const login = (email, password) => {
    const cleanEmail = email.trim().toLowerCase();

    const match = users.find(
      (u) => u.email === cleanEmail && u.password === password
    );

    if (!match) {
      return { ok: false, error: 'Incorrect email or password.' };
    }

    setCurrentUserId(match.id);

    return { ok: true, role: match.role };
  };

  const logout = () => {
    setCurrentUserId(null);
  };

  // Saves changes (name, phone, dietary preference) for the logged-in user.
  const updateProfile = (changes) => {
    setUsers((currentUsers) =>
      currentUsers.map((u) =>
        u.id === currentUserId ? { ...u, ...changes } : u
      )
    );
  };

  return (
    <AuthContext.Provider
      value={{ user, role, register, login, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
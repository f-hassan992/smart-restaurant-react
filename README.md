# Smart Restaurant Management System: Assignment 1 (React Frontend)

SODV2201 Web Programming, Final Project, Assignment 1.

A React frontend for a restaurant, with a customer side and an admin side.
It uses mock data and React state only. There is no backend yet (Assignment 2).

## Features

**Customer**

- Menu with categories, search, and filters (category, dietary, price)
- Shopping cart with quantity controls and totals
- Checkout with delivery or pickup, validation, and an order confirmation
- Order history with live status
- Table reservations with special events and validation
- Simulated AI chat assistant using a question and answer dataset

**Admin** (use "Login as Admin")

- Dashboard with totals, sales, pending reservations, and most ordered dishes
- Menu management: add, edit, delete, and availability toggle
- Orders: view and update status (Received, Preparing, Ready, Delivered)
- Reservations: approve or cancel

## Tech

React, Vite, React Router, plain CSS. State is shared with the Context API.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173/

## Notes

- Data lives in memory, so refreshing the browser resets the cart, orders,
  reservations, and menu changes.
- Login is a demo role selector, not real authentication.

## Folder structure

```
src/
├── components/   reusable pieces (common, menu, cart, orders, reservations, chat, admin)
├── context/      shared state (auth, menu, cart, orders, reservations)
├── data/         mock data (menu, chatbot)
├── layouts/      customer and admin layouts
├── pages/        customer and admin pages
└── utils/        helper functions (chatbot reply logic)
```

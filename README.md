# 🍔 Food Ordering System

A full-stack food ordering platform with customer and admin interfaces, built with React, Redux Toolkit, Tailwind CSS, and Django REST Framework.

## 📌 Project Overview

This is a complete food ordering system that allows customers to browse restaurants, view menus, place orders, and track deliveries. It also includes a comprehensive admin panel for managing restaurants, menu items, orders, deals, and categories.

## ✨ Key Features

### 👤 Customer Features
- Browse restaurants and view menus
- Add items to cart with quantity management
- Secure checkout with Stripe payment integration
- Order tracking with real-time status updates
- View order history and order details
- Special deals and offers
- User authentication (Login/Signup)
- Category-based restaurant filtering
- Search functionality for restaurants, categories, and menu items

### 👨‍💼 Admin Features
- Dashboard Analytics (total orders, revenue, restaurants, users)
- Order status distribution (pending, accepted, preparing, delivered, cancelled)
- Popular items and deals tracking
- Revenue charts (by restaurant and over time)
- Order Management (view all orders and update status)
- Restaurant Management (create, edit, delete)
- Menu Management (add, edit, delete items)
- Category Management (create, edit, delete)
- Deal Management (create special combo deals)

## 🛠️ Tech Stack

### Frontend
- React 18 - UI Framework
- React Router v6 - Routing & Navigation
- Redux Toolkit - State Management (Cart & Auth)
- Context API - Global Data Management
- Tailwind CSS - Styling
- Recharts - Charts & Analytics
- React Toastify - Notifications
- React Icons - Icons
- Stripe - Payment Gateway

### Backend
- Django - Backend Framework
- Django REST Framework - API Development
- PostgreSQL - Database
- JWT - Authentication
- Stripe - Payment Processing
- Railway - Deployment

## 📁 Project Structure

```
Food-Ordering-System/
├── frontend/
│   └── food-app/
│       ├── src/
│       │   ├── api/endpoints.js
│       │   ├── assets/
│       │   ├── components/
│       │   │   ├── admin/
│       │   │   ├── common/
│       │   │   ├── layout/
│       │   │   └── menu/
│       │   ├── context/
│       │   │   ├── DataContext.jsx
│       │   │   └── DataProvider.jsx
│       │   ├── pages/
│       │   │   ├── admin/
│       │   │   └── customer/
│       │   ├── redux/
│       │   │   ├── slices/
│       │   │   │   ├── authSlice.js
│       │   │   │   └── cartSlice.js
│       │   │   └── store.js
│       │   ├── App.jsx
│       │   ├── index.css
│       │   └── main.jsx
│       ├── .env
│       ├── package.json
│       └── tailwind.config.js
├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   ├── food_ordering_system/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   └── apps/
│       ├── users/
│       ├── restaurants/
│       ├── orders/
│       └── payments/
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Python (v3.8 or higher)

### Frontend Setup
```bash
git clone https://github.com/Anousha-Ahmed/Food-Ordering-System.git
cd Food-Ordering-System/frontend/food-app
npm install
```

Create `.env` file:
```env
VITE_API_BASE_URL=http://localhost:8000
```

Run:
```bash
npm run dev        # Development
npm run build      # Production
```

### Backend Setup
```bash
cd Food-Ordering-System/backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

## 🌐 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/user/register/` | User registration |
| POST | `/user/login/` | User login |

### Customer
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/restaurants/all-restaurant` | Get all restaurants |
| GET | `/restaurants/restaurant/{id}` | Get restaurant details |
| GET | `/restaurants/all-menuitem` | Get all menu items |
| GET | `/restaurants/all-deal/` | Get all deals |
| GET | `/restaurants/all-category` | Get all categories |
| GET | `/restaurants/search/` | Search restaurants, categories, menu |

### Cart
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/order/cart/` | Get cart items |
| POST | `/order/cart/add/` | Add item to cart |
| PATCH | `/order/cart/update-item/{id}/` | Update quantity |
| DELETE | `/order/cart/delete-item/{id}/` | Remove from cart |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/order/stripe/checkout/` | Create Stripe session |
| POST | `/order/checkout/` | Complete order |
| GET | `/order/orders/` | Get user orders |
| GET | `/order/order/{id}` | Get order details |
| PATCH | `/order/order/{id}/cancel/` | Cancel order |

### Admin
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/order/admin/analytics/overview/` | Dashboard overview |
| GET | `/order/admin/analytics/orders-by-status/` | Order status counts |
| GET | `/order/admin/analytics/revenue-over-time/` | Revenue over time |
| GET | `/order/admin/analytics/revenue-by-restaurant/` | Revenue by restaurant |
| GET | `/order/admin/analytics/popular-items/` | Popular menu items |
| GET | `/order/admin/analytics/popular-deals/` | Popular deals |
| GET | `/order/admin/orders` | All orders |
| PATCH | `/order/admin/orders/{id}/status/` | Update order status |

### Admin CRUD
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/restaurants/create-restaurant/` | Create restaurant |
| PATCH | `/restaurants/update-restaurant/{id}/` | Update restaurant |
| DELETE | `/restaurants/delete-restaurant/{id}/` | Delete restaurant |
| POST | `/restaurants/create-menuitem/` | Create menu item |
| PUT | `/restaurants/update-menuitem/{id}/` | Update menu item |
| DELETE | `/restaurants/delete-menuitem/{id}/` | Delete menu item |
| POST | `/restaurants/create-category/` | Create category |
| PUT | `/restaurants/update-category/{id}/` | Update category |
| DELETE | `/restaurants/delete-category/{id}/` | Delete category |
| POST | `/restaurants/create-deal/` | Create deal |
| PATCH | `/restaurants/update-deal/{id}/` | Update deal |
| DELETE | `/restaurants/delete-deal/{id}/` | Delete deal |

## 🔐 Authentication Flow

1. User registers with email and password
2. Login returns JWT tokens (access and refresh)
3. Tokens stored in localStorage
4. Protected routes check authentication
5. Admin routes check `is_admin` flag

## 🛒 Cart Flow

1. User adds items to cart
2. Cart stored in Redux + localStorage
3. Cart syncs with backend API
4. Checkout validates items and address
5. Stripe payment processes order

## 💳 Payment Flow

1. User clicks "Pay With Card"
2. Backend creates Stripe checkout session
3. User redirected to Stripe
4. User completes payment
5. Redirected to payment success page
6. Order created in backend

## 📊 Admin Dashboard

- Overview Cards: Total Orders, Total Revenue, Restaurants, Users
- Order Status: Pending, Accepted, Preparing, Out for Delivery, Delivered, Cancelled
- Popular Items: Most ordered menu items with quantity and revenue
- Popular Deals: Most purchased deals with quantity and revenue
- Revenue Charts: By Restaurant (Bar chart) and Over Time (Line chart)

## 🎨 UI Features

- Mobile-first responsive design
- Tailwind CSS for styling
- Smooth animations and transitions
- Toast notifications for success/error messages
- Interactive charts for analytics

## 🔧 Environment Variables

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:8000
```

### Backend (.env)
```env
DEBUG=True
SECRET_KEY=your-secret-key
DATABASE_URL=sqlite:///db.sqlite3
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173
```



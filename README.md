# 🛍️ E-Commerce

 E-Commerce platform built with Django REST Framework and React.

The project provides product management, product variants, authentication, shopping cart, wishlist, and product search functionality through RESTful APIs.

---

## 🚀 Features

### 🔐 Authentication
- User registration
- User login
- JWT authentication
- Access and refresh tokens
- Automatic access token refresh

### 🛍️ Products
- Product listing
- Product details
- Product categories
- Product images
- Product attributes
- Product variations
- Product variants
- Stock management
- Product search
- Product sorting

### 🛒 Shopping Cart
- Add product variants to cart
- Update item quantity
- Remove cart items
- Calculate item subtotal
- Calculate cart total
- Stock validation

### ❤️ Wishlist
- Add products to wishlist
- Remove products from wishlist
- Wishlist counter
- Toggle wishlist state
- Persistent wishlist using API

### 🔎 Search
- Search products from Navbar
- Search products from Products page
- Search results using URL query parameters

---

## 🛠️ Technologies

### Backend
- Python
- Django
- Django REST Framework
- Simple JWT
- PostgreSQL / SQLite

### Frontend
- React
- React Router
- Axios
- Tailwind CSS
- React Icons


## 📁 Project Structure

```text
fashion-ecommerce/
│
├── backend/
│   ├── manage.py
│   ├── config/
│   ├── accounts/
│   ├── products/
│   ├── cart/
│   ├── wishlist/
│   └── ...
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── api/
│   │   └── ...
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
# ZafaF Perfume Store 

ZafaF Perfume Store is a full-stack MERN e-commerce application
for browsing and purchasing perfumes.

The application is containerized using Docker and Docker Compose,
with CI/CD automation using GitHub Actions and Docker Hub.

---

##  Features

- User Registration and Login
- Product Listing
- Product Search
- Product Filtering
- Product Sorting
- Product Details
- Shopping Cart
- Wishlist
- Orders
- Product Reviews
- Admin Dashboard
- PayPal Payment Integration

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router
- Tailwind CSS
- Axios
- Vite

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

### DevOps
- Docker
- Docker Compose
- Nginx
- GitHub Actions
- Docker Hub

---

## 🐳 Docker Architecture

The application consists of three containers:

```text
              ZafaF Perfume Store
                     │
             Docker Compose
                     │
       ┌─────────────┼─────────────┐
       │             │             │
       ▼             ▼             ▼
   Frontend       Backend       MongoDB
   React +        Node +        MongoDB
   Nginx          Express
    :3000          :5000        :27017
       │             │             │
       └─────────────┴─────────────┘
             Docker Network
                     │
               Persistent
                  Volume
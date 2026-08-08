#  ZafaF Perfume Store

ZafaF Perfume Store is a full-stack MERN e-commerce application for
browsing, purchasing, and managing perfumes.

The application is containerized using Docker and Docker Compose.
It also includes GitHub Actions CI/CD automation and Docker Hub image
publishing.

---

##  Features

### 👤 User Features

- User Registration
- User Login
- JWT Authentication
- Product Listing
- Product Search
- Product Filtering
- Product Sorting
- Product Details
- Shopping Cart
- Wishlist
- Orders
- Product Reviews
- PayPal Payment Integration

### 🔐 Admin Features

- Admin Login
- Admin Dashboard
- Product Management
- User Management
- Order Management
- Revenue Management
- Product Analytics
- Admin Statistics

---

## 🛠️ Tech Stack

### Frontend

- React.js
- React Router
- Tailwind CSS
- Axios
- Vite
- Nginx

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- CORS

### DevOps

- Docker
- Docker Compose
- Docker Network
- Docker Volumes
- Nginx
- GitHub Actions
- Docker Hub

---

# 🐳 Docker Architecture

The application runs using three Docker containers:

```text
                  ZafaF Perfume Store
                         │
                  Docker Compose
                         │
          ┌──────────────┼──────────────┐
          │              │              │
          ▼              ▼              ▼
      Frontend        Backend         MongoDB
      React +         Node +          MongoDB
      Nginx           Express
       :3000           :5000           :27017
          │              │              │
          └──────────────┼──────────────┘
                         │
                  Docker Network
                         │
                  Persistent Volume
                    mongo_data
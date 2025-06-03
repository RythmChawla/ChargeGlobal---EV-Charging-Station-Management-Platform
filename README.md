# ChargeGlobal - EV Charging Station Management Platform

<div align="center">

**A comprehensive platform for managing electric vehicle charging stations worldwide**

[![Node.js](https://img.shields.io/badge/Node.js-v14+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-v18+-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-v4+-green.svg)](https://www.mongodb.com/)

[Live Demo](https://charge-global-ev-charging-station-m-psi.vercel.app/)

</div>

## 📋 Table of Contents

- [About The Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Acknowledgments](#acknowledgments)

## 🚗 About The Project

ChargeGlobal is a full-stack web application designed to revolutionize the management and discovery of electric vehicle charging stations. The platform provides real-time monitoring, interactive maps, and comprehensive management tools for both individual users and business operators.

### Why ChargeGlobal?

- **Real-time Data**: Live updates on charging station availability and status
- **Global Reach**: Support for charging stations worldwide with multi-language capabilities
- **User-Friendly**: Intuitive interface for both drivers and station operators
- **Scalable**: Built to handle thousands of stations and users
- **Mobile-First**: Responsive design optimized for all devices

## ✨ Features

### 🌍 Public Features
- **Station Discovery**: Search and find charging stations globally
- **Real-time Availability**: Live status updates for charging points
- **Interactive Maps**: Visual station locations with detailed popups
- **Advanced Filtering**: Filter by connector type, power output, and location
- **Route Planning**: Smart navigation to charging stations
- **Station Reviews**: Community-driven ratings and reviews

### 🏢 Business Features
- **Station Management**: Complete CRUD operations for charging stations
- **Analytics Dashboard**: Comprehensive statistics and insights
- **User Management**: Role-based access control
- **Bulk Operations**: Manage multiple stations efficiently
- **API Access**: RESTful API for third-party integrations
- **Custom Branding**: White-label solutions for enterprises

### 🔧 Technical Features
- **Geospatial Queries**: MongoDB-powered location-based searches
- **Real-time Updates**: WebSocket integration for live data
- **Responsive Design**: Mobile-first approach
- **Security**: JWT authentication and data encryption
- **Performance**: Optimized queries and caching

## 🛠️ Tech Stack

### Frontend
- **[React.js](https://reactjs.org/)** - Component-based UI framework
- **[React Router](https://reactrouter.com/)** - Client-side routing
- **[Leaflet](https://leafletjs.com/)** - Interactive maps
- **[Lucide React](https://lucide.dev/)** - Modern icon library
- **CSS3** - Custom styling with Flexbox/Grid

### Backend
- **[Node.js](https://nodejs.org/)** - JavaScript runtime
- **[Express.js](https://expressjs.com/)** - Web application framework
- **[MongoDB](https://www.mongodb.com/)** - NoSQL database
- **[Mongoose](https://mongoosejs.com/)** - MongoDB object modeling
- **[JWT](https://jwt.io/)** - Authentication tokens
- **[bcrypt](https://www.npmjs.com/package/bcrypt)** - Password hashing

### DevOps & Tools
- **[Git](https://git-scm.com/)** - Version control
- **[npm](https://www.npmjs.com/)** - Package management
- **[Postman](https://www.postman.com/)** - API testing
- **[MongoDB Compass](https://www.mongodb.com/products/compass)** - Database GUI

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14.0.0 or higher)
- **npm** (v6.0.0 or higher)
- **MongoDB** (v4.0.0 or higher)
- **Git**

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/chargeglobal.git
   cd chargeglobal
   \`\`\`

2. **Install Backend Dependencies**
   \`\`\`bash
   cd backend
   npm install
   \`\`\`

3. **Install Frontend Dependencies**
   \`\`\`bash
   cd ../frontend
   npm install
   \`\`\`

4. **Set up Environment Variables**

   Create `.env` file in the backend directory:
   \`\`\`env
   # Database
   MONGODB_URI=YOUR_MONGO_URI
   
   # Authentication
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRE=7d
   
   # Server
   PORT=8080
   NODE_ENV=development
   
   # CORS
   CLIENT_URL=http://localhost:3000
   \`\`\`

   Create `.env` file in the frontend directory:
   \`\`\`env
   REACT_APP_API_URL=http://localhost:8080/api
   REACT_APP_MAP_API_KEY=your-map-api-key
   \`\`\`

5. **Start MongoDB**
   \`\`\`bash
   # Using MongoDB service
   sudo systemctl start mongod
   
   # Or using MongoDB directly
   mongod
   \`\`\`

6. **Run the Application**

   Start the backend server:
   \`\`\`bash
   cd backend
   npm start
   \`\`\`

   Start the frontend development server (in a new terminal):
   \`\`\`bash
   cd frontend
   npm start
   \`\`\`

7. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080/api

## 📖 Usage

### For EV Drivers

1. **Find Stations**: Use the search functionality to find nearby charging stations
2. **View Details**: Click on stations to see connector types, pricing, and availability
3. **Get Directions**: Use the integrated map to navigate to stations

### For Station Operators

1. **Sign Up**: Create a business account
2. **Add Stations**: Input your charging station details
3. **Manage Inventory**: Update station status for easy understanding

### API Usage

\`\`\`javascript
// Get all stations
fetch('http://localhost:8080/api/stations')
  .then(response => response.json())
  .then(data => console.log(data));

// Add a new station (requires authentication)
fetch('http://localhost:8080/api/stations', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your-jwt-token'
  },
  body: JSON.stringify({
    name: 'Tesla Supercharger',
    location: {
      latitude: 37.7749,
      longitude: -122.4194,
    },
    powerOutput: 150,
    connectorType: 'Tesla Supercharger'
  })
});
\`\`\`

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | User login |

### Station Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/stations` | Get all stations |
| GET | `/api/stations/:id` | Get station by ID |
| POST | `/api/stations` | Create new station |
| PUT | `/api/stations/:id` | Update station |
| DELETE | `/api/stations/:id` | Delete station |
| GET | `/api/stations/nearby/:lat/:lng` | Find nearby stations |

### Request/Response Examples

<details>
<summary>Create Station Request</summary>

\`\`\`json
{
  "name": "Tesla Supercharger Downtown",
  "location": {
    "latitude": 37.7749,
    "longitude": -122.4194
  },
  "status": "Active",
  "powerOutput": 150,
  "connectorType": "Tesla Supercharger"
}
\`\`\`
</details>

<details>
<summary>Station Response</summary>

\`\`\`json
{
  "success": true,
  "data": {
    "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "name": "Tesla Supercharger Downtown",
    "location": {
      "latitude": 37.7749,
      "longitude": -122.4194,
    },
    "status": "Active",
    "powerOutput": 150,
    "connectorType": "Tesla Supercharger",
    "createdAt": "2021-07-21T10:30:00.000Z",
    "updatedAt": "2021-07-21T10:30:00.000Z"
  }
}
\`\`\`
</details>

## 📁 Project Structure

\`\`\`
chargeglobal/
├── 📁 backend/
│   ├── 📁 controllers/
│   │   ├── authController.js
│   │   └── stationController.js
│   ├── 📁 middleware/
│   │   ├── auth.js
│   │   └── validation.js
│   ├── 📁 models/
│   │   ├── User.js
│   │   └── ChargingStation.js
│   ├── 📁 routes/
│   │   ├── auth.js
│   │   └── stations.js
│   ├── 📁 utils/
│   │   └── database.js
│   ├── .env
│   ├── server.js
│   └── package.json
├── 📁 frontend/
│   ├── 📁 public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── 📁 src/
│   │   ├── 📁 components/
│   │   │   ├── 📁 common/
│   │   │   │   └── Header.jsx
│   │   │   ├── 📁 public/
│   │   │   │   ├── HeroSection.jsx
│   │   │   │   ├── FeaturesSection.jsx
│   │   │   │   └── PublicHomePage.jsx
│   │   │   ├── 📁 business/
│   │   │   │   ├── DashboardStats.jsx
│   │   │   │   ├── StationGrid.jsx
│   │   │   │   └── BusinessDashboard.jsx
│   │   │   └── 📁 filters/
│   │   │       ├── SearchFilters.jsx
│   │   │       └── FilterPanel.jsx
│   │   ├── 📁 pages/
│   │   │   ├── About.jsx
│   │   │   ├── Pricing.jsx
│   │   │   ├── Support.jsx
│   │   │   └── FindStations.jsx
│   │   ├── 📁 styles/
│   │   │   ├── Home.css
│   │   │   ├── login.css
│   │   │   └── components/
│   │   ├── App.js
│   │   ├── index.js
│   │   └── utils.js
│   ├── .env
│   └── package.json
├── 📁 docs/
│   ├── API.md
│   └── DEPLOYMENT.md
├── .gitignore
├── README.md
└── LICENSE
\`\`\`


## 📞 Contact

**Your Name** - [Rythm Chawla](https://www.linkedin.com/in/rythm-chawla-499113264) - rythmchawla621@gmail.com

**Project Link**: [Github](https://github.com/RythmChawla/ChargeGlobal---EV-Charging-Station-Management-Platform/)

**Live Demo**: [https://chargeglobal-demo.vercel.app](https://chargeglobal-demo.vercel.app)

## 🙏 Acknowledgments

- [React.js](https://reactjs.org/) - The web framework used
- [MongoDB](https://www.mongodb.com/) - Database platform
- [Leaflet](https://leafletjs.com/) - Interactive maps
- [Lucide](https://lucide.dev/) - Beautiful icons
- [Express.js](https://expressjs.com/) - Backend framework
- [JWT](https://jwt.io/) - Authentication standard

---

<div align="center">

**Built with ❤️ for the future of electric mobility**

</div>

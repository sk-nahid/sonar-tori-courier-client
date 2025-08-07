# Sonar Tori - Parcel Delivery System

A full-stack parcel delivery application built with React, Node.js, MongoDB, and Firebase Authentication.  
The system supports door-to-door parcel service with real-time tracking, user roles, payments, and rider management.

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

---

## Features

### Parcel Delivery Flow
- Parcel creation with sender & receiver info
- Dynamic region, district, and service center dropdowns based on data
- Cost calculation based on parcel type, weight, and delivery area
- Unique parcel tracking ID generation
- Confirmation modal with cost breakdown (using SweetAlert2)

### Parcel Tracking
- Track parcel status with detailed logs (e.g. warehouse collection, dispatch, rider assignment)
- Public tracking page and user panel integration

### Payments
- Stripe integration for card payments
- Payment history tracking

### User & Role Management
- Firebase Authentication
- User roles stored in MongoDB (`user`, `admin`, `rider`, `pending`)
- Role-based access and admin assignment by email search

### Rider Management
- Rider application form (auto-fills user info)
- Admin approval/rejection with detailed modal
- Rider dashboard and earnings tracking (planned)

### Admin Dashboard
- Responsive layout with sidebar and top navigation
- Manage users, parcels, riders, and payments
- Interactive tables with actions (View, Pay, Delete, Approve)

---

## Tech Stack

- **Frontend:** React, Tailwind CSS, DaisyUI, React Hook Form, SweetAlert2, React Router, TanStack Query  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Authentication:** Firebase Auth  
- **Payments:** Stripe  
- **HTTP Client:** Axios (with secured instance)  

---

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB instance (local or cloud)
- Firebase project setup with Authentication enabled
- Stripe account for payments

### website- 

https://sonar-tori-2adb2.web.app/

### backend- 

https://github.com/sk-nahid/sonar-tori-courier-server/

# IGNOU IQ HINDI - Educational Platform

A modern, responsive educational platform for IGNOU students to access notes, assignments, and classes. Redesigned with a full-stack architecture using React, Express, and MongoDB.

## 🚀 Features

-   **Modern UI/UX**: Responsive design with a premium look and feel.
-   **User Authentication**: Secure Login and Signup with JWT.
-   **Notes Store**: Browse and search for study materials.
-   **Payment Integration**: Integrated Razorpay for secure purchases.
-   **User Dashboard**: Track purchased notes and account status.
-   **Mobile Responsive**: Optimized for all devices.

## 🛠️ Tech Stack

-   **Frontend**: React, Vite, Vanilla CSS (Variables & Utility Classes), Lucide React (Icons).
-   **Backend**: Node.js, Express.js.
-   **Database**: MongoDB (Atlas or Local).
-   **Payments**: Razorpay.
-   **Authentication**: JSON Web Tokens (JWT), Bcrypt.js.

## ⚙️ Setup & Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/RohanShill/Ignouiq.git
    cd Ignouiq
    ```

2.  **Install Dependencies**:
    ```bash
    # Install Frontend & Backend dependencies
    npm install
    ```

3.  **Environment Configuration**:
    Create a `.env` file in the root directory and add the following:
    ```env
    PORT=5000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    RAZORPAY_KEY_ID=your_razorpay_key_id
    RAZORPAY_KEY_SECRET=your_razorpay_key_secret
    ```

## 🏃‍♂️ Running the Application

You need to run both the Backend and Frontend servers.

**1. Start Backend Server:**
```bash
node server/server.js
```
*Runs on http://localhost:5000*

**2. Start Frontend Server:**
Open a new terminal:
```bash
npm run dev
```
*Runs on http://localhost:5173*

## 📂 Project Structure

-   `src/`: React Frontend source code.
    -   `components/`: Reusable UI components (Navbar, Footer).
    -   `pages/`: Application pages (Home, Login, Notes, Dashboard).
    -   `context/`: React Context (AuthContext).
    -   `services/`: API service functions.
    -   `styles/`: Global CSS and variables.
-   `server/`: Express Backend source code.
    -   `models/`: Mongoose database models.
    -   `routes/`: API routes (Auth, Payment).
-   `legacy/`: Old HTML/CSS/JS files (for reference).

## 📄 License

This project is licensed under the MIT License.

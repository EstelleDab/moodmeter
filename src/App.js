import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header.js";
import ProtectedRoute from "./components/ProtectedRoute.js";
import LoginForm from "./components/LoginForm.js";
import RegisterForm from "./components/RegisterForm.js";
import UserHome from "./components/UserHome.js";
import FeedbackForm from "./components/FeedbackForm.js";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home.js";
import "./styles/Global.css";
import "./bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const App = () => {
  return (
    <Router>
      <ContentApp />
    </Router>
  );
};

const ContentApp = () => {
  const location = useLocation(); // Hook to detect current route
  const [user, setUser] = useState(null);

  // Routes where the Header should not appear
  const hideHeaderRoutes = ["/login", "/register"];

  return (
    <div>
      {/* Show Header unless the current route matches hideHeaderRoutes */}
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}

      <Routes>
        <Route path="/" element={<Home user={user} setUser={setUser} />} />
        <Route
          path="/userhome"
          element={
            <ProtectedRoute user={user}>
              <UserHome />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginForm onLoginSuccess={setUser} />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/feedback" element={<FeedbackForm />} />
        <Route path="/feedback/:ueId" element={<FeedbackForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default App;

import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Ride from "./components/Ride";
import Driver from "./components/Driver";
import User from "./components/User";
import PrivateRoute from "./components/PrivateRoute";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <div className="container"> 
      <BrowserRouter>
        <Header />
        <br />
        <Routes>
          {/* Login route */}
          <Route path="/login" element={<Login />} />

          {/* Redirect root to /rides or /login depending on auth */}
          <Route
            path="/"
            element={
              isLoggedIn ? <Navigate to="/rides" /> : <Navigate to="/login" />
            }
          />

          {/* Protected route: Rides */}
          <Route
            path="/rides"
            element={
              <PrivateRoute>
                <Ride />
              </PrivateRoute>
            }
          />
          {/* Protected route: Drivers */}
          <Route
            path="/drivers"
            element={
              <PrivateRoute>
                <Driver />
              </PrivateRoute>
            }
          />
          {/* Protected route: Users */}
          <Route
            path="/users"
            element={
              <PrivateRoute>
                <User />
              </PrivateRoute>
            }
          />          
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

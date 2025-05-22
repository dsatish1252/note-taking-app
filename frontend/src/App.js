import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import "./index.css"; // Global styles

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <main className="container">
          <Routes>
            <Route path="/" element={<Login />} /> {/* Default to login */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              {/* Add more protected routes here, e.g., /notes/:id for single note view/edit */}
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </AuthProvider>
    </Router>
  );
}

export default App;

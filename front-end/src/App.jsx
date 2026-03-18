import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EditProperty from "./pages/EditProperty";
import AddBien from "./components/AddBien";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Router>
      <Routes>

        {/* Page Login */}
        <Route path="/login" element={<Login />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Page Modifier un bien */}
        <Route path="/edit-property/:id" element={<EditProperty />} />

        {/* Admin Dashboard */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        {/* Ajouter un bien */}
        <Route path="/add-property" element={<AddBien />} />
        
      </Routes>
    </Router>
  );
}


export default App;
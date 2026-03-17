import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EditProperty from "./pages/EditProperty";
import AddBien from "./components/AddBien";

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

      </Routes>
    </Router>
  );
}


export default App;
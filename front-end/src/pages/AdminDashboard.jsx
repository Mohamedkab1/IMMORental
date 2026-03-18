import React, { useEffect, useState } from "react";
import axios from "axios";
import {Bar} from "react-chartjs-2";
import { data } from "react-router-dom";

const data = {
    labels:["Utilisateurs","Biens","Demandes"],
    datasets:[
        {
            label:"Statistiques",
            data:[stats.users, stats.properties, stats.contacts], 
        }
    ]
};

function AdminDashboard() {

  const [stats, setStats] = useState({
    users: 0,
    properties: 0,
    contacts: 0
  });

  useEffect(() => {
    axios.get("http://localhost:8000/api/admin/dashboard")
      .then(res => {
        setStats(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container">

      <h1>Dashboard Admin</h1>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>

        {/* USERS */}
        <div style={cardStyle}>
          <h3>Utilisateurs</h3>
          <p>{stats.users}</p>
        </div>

        {/* PROPERTIES */}
        <div style={cardStyle}>
          <h3>Biens</h3>
          <p>{stats.properties}</p>
        </div>

        {/* CONTACTS */}
        <div style={cardStyle}>
          <h3>Demandes</h3>
          <p>{stats.contacts}</p>
        </div>
        
        {/* 📊 GRAPHIQUE ICI */}
        <div style={{ marginTop: "40px" }}>
            <Bar data={data} />
        </div>

      </div>

    </div>
  );
}

const cardStyle = {
  padding: "20px",
  border: "1px solid #ddd",
  borderRadius: "10px",
  width: "200px",
  textAlign: "center",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
};

export default AdminDashboard;
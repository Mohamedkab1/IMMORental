import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Dashboard() {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  const logout = () => {
  localStorage.removeItem("token");
  navigate("/login");
};

  // Charger les biens de l'utilisateur
  useEffect(() => {
    api.get("/properties") // Route qui retourne les biens connectés
      .then(res => {
        setProperties(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  // 🔴 SUPPRESSION
  const handleDelete = (id) => {

    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer ce bien ?");

    if (!confirmDelete) return;

    api.delete(`/properties/${id}`)
      .then(res => {
        alert(res.data.message);

        // Mettre à jour la liste sans recharger la page
        setProperties(properties.filter(property => property.id !== id));
      })
      .catch(err => {
        if (err.response?.status === 403) {
          alert("Non autorisé !");
        } else if (err.response?.status === 401) {
          alert("Vous devez vous connecter !");
          navigate("/login");
        } else {
          alert("Erreur suppression");
        }
      });
  };

  return (
    <div>
      <button 
  onClick={logout}
  style={{marginBottom: "20px"}}
>
  Logout
</button>
      <h1>Dashboard</h1>

      {properties.length === 0 ? (
        <p>Aucun bien trouvé</p>
      ) : (
        properties.map(property => (
          <div key={property.id} style={{border: "1px solid gray", margin: "10px", padding: "10px"}}>

            <h3>{property.title}</h3>
            <p>Prix : {property.price}</p>
            <p>{property.description}</p>

            {/* 🟢 Bouton Modifier */}
            <button onClick={() => navigate(`/edit-property/${property.id}`)}>
              Modifier
            </button>

            {/* 🔴 Bouton Supprimer */}
            <button 
              onClick={() => handleDelete(property.id)}
              style={{marginLeft: "10px", backgroundColor: "red", color: "white"}}
            >
              Supprimer
            </button>

          </div>
        ))
      )}

    </div>
  );
}

export default Dashboard;
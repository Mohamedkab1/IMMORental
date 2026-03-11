import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function PropertyList() {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/properties")
      .then(res => setProperties(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h1>Liste des biens</h1>
      {properties.map(p => (
        <div key={p.id} style={{border: "1px solid gray", margin: "10px", padding: "10px"}}>
          <h3>{p.title}</h3>
          <p>Prix : {p.price} MAD</p>
          <p>Ville : {p.city}</p>
          {p.images && p.images[0] && <img src={p.images[0].url} width="200" alt="property" />}
          <button onClick={() => navigate(`/properties/${p.id}`)}>Voir détail</button>
        </div>
      ))}
    </div>
  );
}

export default PropertyList;
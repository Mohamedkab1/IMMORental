import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function PropertyList() {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  const [page, setPage] = useState(1);        
  const [limit] = useState(5);              
  const [totalPages, setTotalPages] = useState(1); 

  useEffect(() => {
  api.get("/properties", {
    params: { page, limit }
  })
  .then(res => {
    setProperties(res.data.data);    
    setTotalPages(res.data.totalPages); 
  })
  .catch(err => console.log(err));
}, [page]);

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
      <div style={{marginTop: "20px"}}>
  <button onClick={() => setPage(p => Math.max(p-1, 1))} disabled={page === 1}>
    Précédent
  </button>
  <span style={{margin: "0 10px"}}>Page {page} / {totalPages}</span>
  <button onClick={() => setPage(p => Math.min(p+1, totalPages))} disabled={page === totalPages}>
    Suivant
  </button>
      </div>
    </div>
  );
}

export default PropertyList;
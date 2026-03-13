import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function DemandList() {
  const [demands, setDemands] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const fetchDemands = () => {
    api.get("/demands", { params: { page, status: statusFilter } })
      .then(res => {
        setDemands(res.data.data);
        setTotalPages(res.data.totalPages);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchDemands();
  }, [page, statusFilter]);

  return (
    <div>
      <h1>Liste des demandes</h1>

      <div>
        <label>Filtrer par statut: </label>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="">Tous</option>
          <option value="Nouveau">Nouveau</option>
          <option value="En cours">En cours</option>
          <option value="Traité">Traité</option>
        </select>
      </div>

      {demands.map(d => (
        <div key={d.id} style={{border:"1px solid gray", margin:"10px", padding:"10px"}}>
          <p>Client: {d.client_name}</p>
          <p>Type: {d.type}</p>
          <p>Budget: {d.budget} MAD</p>
          <p>Ville: {d.city}</p>
          <p>Statut: {d.status}</p>
          <button onClick={() => navigate(`/demands/${d.id}`)}>Voir détail</button>
        </div>
      ))}

      <div style={{marginTop:"20px"}}>
        <button onClick={() => setPage(p => Math.max(p-1,1))} disabled={page===1}>Précédent</button>
        <span style={{margin:"0 10px"}}>Page {page} / {totalPages}</span>
        <button onClick={() => setPage(p => Math.min(p+1,totalPages))} disabled={page===totalPages}>Suivant</button>
      </div>
    </div>
  );
}

export default DemandList;
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function DemandDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [demand, setDemand] = useState(null);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    api.get(`/demands/${id}`)
      .then(res => {
        setDemand(res.data);
        setStatus(res.data.status);
      })
      .catch(err => {
        setError("Demande introuvable");
      });
  }, [id]);

  const handleStatusChange = () => {
    if (!status) return;

    api.put(`/demands/${id}/status`, { status })
      .then(res => {
        alert("Statut mis à jour !");
        setDemand(prev => ({ ...prev, status }));
      })
      .catch(err => {
        alert("Vous n'êtes pas autorisé à changer le statut");
      });
  };

  if (error) return <h2>{error}</h2>;
  if (!demand) return <h2>Chargement...</h2>;

  return (
    <div>
      <h1>Détail de la demande</h1>
      <p>Client: {demand.client_name}</p>
      <p>Type: {demand.type}</p>
      <p>Budget: {demand.budget} MAD</p>
      <p>Ville: {demand.city}</p>
      <p>Statut actuel: {demand.status}</p>

      <div>
        <label>Changer statut: </label>
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option value="Nouveau">Nouveau</option>
          <option value="En cours">En cours</option>
          <option value="Traité">Traité</option>
        </select>
        <button onClick={handleStatusChange}>Mettre à jour</button>
      </div>

      <button onClick={() => navigate("/demands")} style={{marginTop:"20px"}}>
        Retour à la liste
      </button>
    </div>
  );
}

export default DemandDetail;
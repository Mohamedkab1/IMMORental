import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function PropertyDetail() {

  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/properties/${id}`)
      .then(res => {
        setProperty(res.data);
      })
      .catch(err => {
        setError(true);
      });
  }, [id]);

  if (error) {
    return <h2>Bien introuvable</h2>;
  }

  if (!property) {
    return <h2>Chargement...</h2>;
  }

  return (
    <div>

      <h1>{property.title}</h1>
      <p>Prix : {property.price} MAD</p>
      <p>Ville : {property.city}</p>
      <p>Surface : {property.surface} m²</p>

      <h3>Description</h3>
      <p>{property.description}</p>

      <h3>Galerie</h3>

      <div>
        {property.images && property.images.map(img => (
          <img
            key={img.id}
            src={img.url}
            alt="property"
            width="200"
          />
        ))}
      </div>

      <h3>Agent</h3>

      {property.agent && (
        <div>
          <p>Nom : {property.agent.name}</p>
          <p>Email : {property.agent.email}</p>
          <p>Téléphone : {property.agent.phone}</p>
        </div>
      )}

      <a href={`mailto:${property.agent?.email}`}>
        <button>Contacter l'agent</button>
      </a>

    </div>
  );
}

export default PropertyDetail;
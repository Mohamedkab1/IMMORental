import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function EditProperty() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    price: "",
    description: ""
  });

  useEffect(() => {
    api.get(`/properties/${id}`)
      .then(res => {
        setForm(res.data);
      })
      .catch(() => {
        alert("Erreur chargement");
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    api.put(`/properties/${id}`, form)
      .then(res => {
        alert(res.data.message);
        navigate("/dashboard");
      })
      .catch(err => {
        if (err.response.status === 403) {
          alert("Non autorisé !");
        }
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={form.title}
        onChange={e => setForm({...form, title: e.target.value})}
      />

      <input
        type="number"
        value={form.price}
        onChange={e => setForm({...form, price: e.target.value})}
      />

      <textarea
        value={form.description}
        onChange={e => setForm({...form, description: e.target.value})}
      />

      <button type="submit">Modifier</button>
    </form>
  );
}

export default EditProperty;
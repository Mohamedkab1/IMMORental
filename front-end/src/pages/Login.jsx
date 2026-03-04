import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  setError("");

  axios.post("http://localhost:8000/api/login", {
    email: form.email,
    password: form.password
  })
  .then((res) => {

    // ✅ res existe ici
    localStorage.setItem("token", res.data.access_token);

    navigate("/dashboard");

  })
  .catch((err) => {

    if (err.response && err.response.data.message) {
      setError(err.response.data.message);
    } else {
      setError("Erreur serveur");
    }

  });
};

  return (
    <div style={{width: "300px", margin: "100px auto"}}>

      <h2>Login</h2>

      {error && <p style={{color: "red"}}>{error}</p>}

      <form onSubmit={handleSubmit}>

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{marginTop: "10px"}}>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button 
          type="submit"
          style={{marginTop: "15px"}}
        >
          Se connecter
        </button>

      </form>

    </div>
  );
}

export default Login;
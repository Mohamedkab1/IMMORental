import { useState } from "react";
import axios from "axios";

function Register() {

    const [formData, setFormData] = useState({
        nom: "",
        email: "",
        password: "",
        password_confirmation: ""
    });

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setSuccess("");

        try {
            const response = await axios.post(
                "http://localhost:8000/api/register",
                formData
            );

            setSuccess(response.data.message);
            setFormData({
                nom: "",
                email: "",
                password: "",
                password_confirmation: ""
            });

        } catch (error) {
            if (error.response.status === 422) {
                setErrors(error.response.data.errors);
            }
        }
    };

    return (
        <div>
            <h2>Inscription</h2>

            {success && <p style={{color: "green"}}>{success}</p>}

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="nom"
                    placeholder="Nom"
                    value={formData.nom}
                    onChange={handleChange}
                />
                {errors.nom && <p>{errors.nom[0]}</p>}

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                {errors.email && <p>{errors.email[0]}</p>}

                <input
                    type="password"
                    name="password"
                    placeholder="Mot de passe"
                    value={formData.password}
                    onChange={handleChange}
                />
                {errors.password && <p>{errors.password[0]}</p>}

                <input
                    type="password"
                    name="password_confirmation"
                    placeholder="Confirmer mot de passe"
                    value={formData.password_confirmation}
                    onChange={handleChange}
                />

                <button type="submit">S'inscrire</button>
            </form>
        </div>
    );
}

export default Register;
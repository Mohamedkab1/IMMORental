import React, { useState } from "react";
import axios from "axios";

function AddBien() {

const [bien, setBien] = useState({
    titre: "",
    description: "",
    prix: "",
    surface: "",
    type: "",
    ville: ""
});

const [errors, setErrors] = useState({});
const [success, setSuccess] = useState("");

const handleChange = (e) => {
    setBien({
        ...bien,
        [e.target.name]: e.target.value
    });
};

const validateForm = () => {

let newErrors = {};

if(!bien.titre){
newErrors.titre = "Le titre est obligatoire";
}

if(!bien.description){
newErrors.description = "La description est obligatoire";
}

if(!bien.prix){
newErrors.prix = "Le prix est obligatoire";
}

if(!bien.surface){
newErrors.surface = "La surface est obligatoire";
}

setErrors(newErrors);

return Object.keys(newErrors).length === 0;

};

const handleSubmit = async (e) => {

e.preventDefault();

if(!validateForm()){
return;
}

try {

await axios.post("http://localhost:8000/api/biens", bien);

setSuccess("Bien ajouté avec succès ✅");

setBien({
titre:"",
description:"",
prix:"",
surface:"",
type:"",
ville:""
});

setErrors({});

} catch(error) {

console.error(error);

if(error.response && error.response.data.errors){
setErrors(error.response.data.errors);
}else{
alert("Erreur lors de l'ajout");
}

}

};

return (

<div className="container mt-4">

<h2>Ajouter un Bien</h2>

{/* message succès */}
{success && (
<div className="alert alert-success">
{success}
</div>
)}

<form onSubmit={handleSubmit}>

<div className="form-group mb-3">
<label>Titre</label>
<input
type="text"
name="titre"
className="form-control"
value={bien.titre}
onChange={handleChange}
/>
{errors.titre && <small className="text-danger">{errors.titre}</small>}
</div>

<div className="form-group mb-3">
<label>Description</label>
<textarea
name="description"
className="form-control"
value={bien.description}
onChange={handleChange}
/>
{errors.description && <small className="text-danger">{errors.description}</small>}
</div>

<div className="form-group mb-3">
<label>Prix</label>
<input
type="number"
name="prix"
className="form-control"
value={bien.prix}
onChange={handleChange}
/>
{errors.prix && <small className="text-danger">{errors.prix}</small>}
</div>

<div className="form-group mb-3">
<label>Surface</label>
<input
type="number"
name="surface"
className="form-control"
value={bien.surface}
onChange={handleChange}
/>
{errors.surface && <small className="text-danger">{errors.surface}</small>}
</div>

<div className="form-group mb-3">
<label>Type</label>
<select
name="type"
className="form-control"
value={bien.type}
onChange={handleChange}
>
<option value="">Choisir</option>
<option value="Appartement">Appartement</option>
<option value="Maison">Maison</option>
<option value="Villa">Villa</option>
<option value="Terrain">Terrain</option>
</select>
</div>

<div className="form-group mb-3">
<label>Ville</label>
<input
type="text"
name="ville"
className="form-control"
value={bien.ville}
onChange={handleChange}
/>
</div>

<button className="btn btn-primary">
Ajouter Bien
</button>

</form>

</div>

);

}

export default AddBien;
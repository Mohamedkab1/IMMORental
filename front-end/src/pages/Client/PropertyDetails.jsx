import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";

import ReservationForm from "../../components/ReservationForm";
import ContactForm from "../../components/ContactForm";

function PropertyDetails() {

const { id } = useParams();

const [property, setProperty] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

useEffect(() => {

API.get(`/biens/${id}`)
.then((res) => {

setProperty(res.data);

setLoading(false);

})
.catch((err) => {

setError("Erreur lors du chargement du bien");

setLoading(false);

});

}, [id]);

if (loading) {
return <p>Loading property...</p>;
}

if (error) {
return <p style={{color:"red"}}>{error}</p>;
}

return (

<div style={{padding:"20px"}}>

<h1>Détails du Bien Immobilier</h1>

<div style={{
border:"1px solid #ddd",
padding:"20px",
marginBottom:"20px"
}}>

<h2>{property.titre}</h2>

<p><b>Description :</b> {property.description}</p>

<p><b>Adresse :</b> {property.adresse}</p>

<p><b>Prix :</b> {property.prix} MAD</p>

<p><b>Statut :</b> {property.statut}</p>

</div>

{/* Reservation */}

<div style={{
border:"1px solid #ccc",
padding:"20px",
marginBottom:"20px"
}}>

<ReservationForm bien_id={property.id_bien} />

</div>

{/* Contact Agent */}

<div style={{
border:"1px solid #ccc",
padding:"20px"
}}>

<ContactForm bien_id={property.id_bien} />

</div>

</div>

);

}

export default PropertyDetails;
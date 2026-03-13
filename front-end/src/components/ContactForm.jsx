import { useState } from "react";
import { sendMessage } from "../services/messageService";

function ContactForm({bien_id}){

const [form,setForm] = useState({

nom:"",
email:"",
message:""

});

const [success,setSuccess] = useState("");
const [error,setError] = useState("");

const handleChange=(e)=>{

setForm({

...form,
[e.target.name]:e.target.value

});

};

const handleSubmit=async(e)=>{

e.preventDefault();

setSuccess("");
setError("");

if(!form.nom || !form.email || !form.message){

setError("Tous les champs sont obligatoires");

return;

}

try{

await sendMessage({

...form,
bien_id

});

setSuccess("Message envoyé avec succès");

setForm({

nom:"",
email:"",
message:""

});

}catch(err){

setError("Erreur lors de l'envoi");

}

};

return(

<div>

<h3>Contacter l'agent</h3>

{success && <p style={{color:"green"}}>{success}</p>}

{error && <p style={{color:"red"}}>{error}</p>}

<form onSubmit={handleSubmit}>

<input

type="text"

name="nom"

placeholder="Nom"

value={form.nom}

onChange={handleChange}

/>

<br/>

<input

type="email"

name="email"

placeholder="Email"

value={form.email}

onChange={handleChange}

/>

<br/>

<textarea

name="message"

placeholder="Votre message"

value={form.message}

onChange={handleChange}

/>

<br/>

<button type="submit">

Envoyer

</button>

</form>

</div>

)

}

export default ContactForm;
import API from "./api";

export const sendMessage = (data)=>{

return API.post("/contact",data);

}
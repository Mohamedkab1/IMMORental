axios.post("http://localhost:8000/api/login", {
  email,
  password
})
.then(res => {
  localStorage.setItem("token", res.data.access_token);
})
.catch(err => {
  console.log(err.response.data.message);
});
localStorage.setItem("token", res.data.access_token);
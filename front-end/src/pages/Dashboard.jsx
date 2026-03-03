import React, { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
  const [data, setData] = useState("");

  useEffect(() => {
    api.get("/dashboard")
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>{data}</p>
    </div>
  );
}

export default Dashboard;
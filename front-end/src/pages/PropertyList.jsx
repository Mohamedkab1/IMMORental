import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function PropertyList() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    city: "",
    type: "",
    minPrice: "",
    maxPrice: "",
    keyword: "",
    sort: ""
  });

  const navigate = useNavigate();
  const [cityFilter, setCityFilter] = useState("");
  const [type, setType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [keyword, setKeyword] = useState("");

  // jib done mn API
  useEffect(() => {
  api.get("/properties", {
    params: {
      page,
      limit,
      city: cityFilter,
      type: type,
      minPrice: minPrice,
      maxPrice: maxPrice,
      keyword: keyword
    }
  })
  .then(res => {
    setProperties(res.data.data);
    setTotalPages(res.data.totalPages);
  })
  .catch(err => console.log(err));
}, [page, cityFilter, type, minPrice, maxPrice, keyword]);

  // filter and sort donee
  useEffect(() => {
    let data = [...properties];

    // filter with city
    if (filters.city) {
      data = data.filter(p => p.city.toLowerCase().includes(filters.city.toLowerCase()));
    }

    // filter with type
    if (filters.type) {
      data = data.filter(p => p.type.toLowerCase() === filters.type.toLowerCase());
    }

    // filter with prix
    if (filters.minPrice) {
      data = data.filter(p => p.price >= parseFloat(filters.minPrice));
    }
    if (filters.maxPrice) {
      data = data.filter(p => p.price <= parseFloat(filters.maxPrice));
    }

    // search with the word 
    if (filters.keyword) {
      data = data.filter(p =>
        p.title.toLowerCase().includes(filters.keyword.toLowerCase()) ||
        p.description.toLowerCase().includes(filters.keyword.toLowerCase())
      );
    }

    // sort price
    if (filters.sort === "asc") {
      data.sort((a, b) => a.price - b.price);
    } else if (filters.sort === "desc") {
      data.sort((a, b) => b.price - a.price);
    }

    setFilteredProperties(data);
  }, [filters, properties]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <h1>Liste des biens</h1>

      <div style={{marginBottom: "20px"}}>
  <label>Filtrer par ville: </label>
  <select value={cityFilter} onChange={e => setCityFilter(e.target.value)}>
    <option value="">Toutes</option>
    <option value="Casablanca">Casablanca</option>
    <option value="Marrakech">Marrakech</option>
    <option value="Rabat">Rabat</option>
    {/* add other cities */}
  </select>
</div>
      
      <div style={{marginBottom: "20px"}}>
  <label>Filtrer par type: </label>
  <select value={type} onChange={e => setType(e.target.value)}>
    <option value="">Tous</option>
    <option value="appartement">Appartement</option>
    <option value="villa">Villa</option>
    <option value="local">Local</option>
  </select>
</div>
  
      
      <div style={{marginBottom:"20px"}}>
  <label>Prix min: </label>
  <input
    type="number"
    value={minPrice}
    onChange={(e)=>setMinPrice(e.target.value)}
  />

  <label style={{marginLeft:"10px"}}>Prix max: </label>
  <input
    type="number"
    value={maxPrice}
    onChange={(e)=>setMaxPrice(e.target.value)}
  />
</div>

      <div style={{marginBottom:"20px"}}>
  <input
    type="text"
    placeholder="Rechercher..."
    value={keyword}
    onChange={(e)=>setKeyword(e.target.value)}
  />
</div>

      {/*  filters  */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="city"
          placeholder="Filtrer par ville"
          value={filters.city}
          onChange={handleFilterChange}
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          name="type"
          placeholder="Filtrer par type"
          value={filters.type}
          onChange={handleFilterChange}
          style={{ marginRight: "10px" }}
        />
        <input
          type="number"
          name="minPrice"
          placeholder="Prix min"
          value={filters.minPrice}
          onChange={handleFilterChange}
          style={{ marginRight: "10px" }}
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Prix max"
          value={filters.maxPrice}
          onChange={handleFilterChange}
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          name="keyword"
          placeholder="Recherche mot-clé"
          value={filters.keyword}
          onChange={handleFilterChange}
          style={{ marginRight: "10px" }}
        />
        <select name="sort" value={filters.sort} onChange={handleFilterChange}>
          <option value="">Trier par prix</option>
          <option value="asc">Prix croissant</option>
          <option value="desc">Prix décroissant</option>
        </select>
      </div>

      {/* menu tl 3a9arat */}
      {filteredProperties.length === 0 ? (
        <p>Aucun bien trouvé</p>
      ) : (
        filteredProperties.map(p => (
          <div key={p.id} style={{border: "1px solid gray", margin: "10px", padding: "10px"}}>
            <h3>{p.title}</h3>
            <p>Prix : {p.price} MAD</p>
            <p>Ville : {p.city}</p>
            <p>Type : {p.type}</p>
            {p.images && p.images[0] && <img src={p.images[0].url} width="200" alt="property" />}
            <button onClick={() => navigate(`/properties/${p.id}`)} style={{marginTop: "10px"}}>
              Voir détail
            </button>
          </div>
        ))
      )}

      {/*  Pagination */}
      <div style={{marginTop: "20px"}}>
        <button onClick={() => setPage(p => Math.max(p-1, 1))} disabled={page === 1}>
          Précédent
        </button>
        <span style={{margin: "0 10px"}}>Page {page} / {totalPages}</span>
        <button onClick={() => setPage(p => Math.min(p+1, totalPages))} disabled={page === totalPages}>
          Suivant
        </button>
      </div>
    </div>
  );
}

export default PropertyList;
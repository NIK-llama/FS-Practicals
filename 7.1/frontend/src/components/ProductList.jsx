import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProductList.css"; // Import the CSS below

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("https://tqutcfivonpkstie-5000.bytexl.net/api/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch products.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="product-list-container">
      <h2>Product List</h2>
      <div className="product-card-wrapper">
        {products.map((p, idx) => (
          <div className="product-card" key={idx}>
            <h3>{p.name}</h3>
            <p>Price: ${p.price}</p>
            <button className="buy-now-btn">Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;

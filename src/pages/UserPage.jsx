import { useEffect, useState } from "react";
import { getProducts } from "../firestore/products";
import { logout } from "../auth";
import "./dashboard.css";

const UserPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <div className="page">
      <div className="header">
        <h1>Products 🛍️</h1>
        <button className="btn btn-logout" onClick={logout}>
          Logout
        </button>
      </div>

      <div className="products">
        {products.map((p) => (
          <div className="card" key={p.id}>
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <b>₹{p.price}</b>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPage;

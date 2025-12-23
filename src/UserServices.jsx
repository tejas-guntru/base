import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../auth";
import { getProducts } from "../firestore/products";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import "./dashboard.css";

const UserPage = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      const snapshot = await getDocs(collection(db, "services"));
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setServices(data);
    };

    fetchServices();
  }, []);

  return (
    <div className="page">
      <div className="header">
        <h1>User Dashboard 👤</h1>
        <button className="btn btn-logout" onClick={logout}>
          Logout
        </button>
      </div>

      {/* PRODUCTS */}
      <h2>Products 🛍️</h2>
      <div className="products">
        {products.map(p => (
          <div className="card" key={p.id}>
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <b>₹{p.price}</b>
          </div>
        ))}
      </div>

      {/* SERVICES */}
      <h2 style={{ marginTop: "2rem" }}>Services ⚙️</h2>
      <div className="products">
        {services.map(s => (
          <div className="card" key={s.id}>
            <h3>{s.name}</h3>
            <p>{s.description}</p>

            <button
              className="btn btn-primary"
              onClick={() => navigate(s.serviceUrl)}
            >
              Open Service
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPage;

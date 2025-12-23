import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../auth";

// PRODUCTS
import { getProducts } from "../firestore/products";

// FIRESTORE
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

import "./dashboard.css";

const UserPage = () => {
  const navigate = useNavigate();

  /* =========================
     STATE
     ========================= */
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);

  /* =========================
     LOAD PRODUCTS
     ========================= */
  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  /* =========================
     LOAD SERVICES
     ========================= */
  useEffect(() => {
    const fetchServices = async () => {
      const snapshot = await getDocs(collection(db, "services"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setServices(data);
    };

    fetchServices();
  }, []);

  /* =========================
     OPEN SERVICE (INTERNAL / EXTERNAL)
     ========================= */
  const openService = (service) => {
    if (service.serviceType === "external") {
      window.open(service.serviceUrl, "_blank", "noopener,noreferrer");
    } else {
      navigate(service.serviceUrl);
    }
  };

  /* =========================
     UI
     ========================= */
  return (
    <div className="page">
      {/* HEADER */}
      <div className="header">
        <h1>User Dashboard 👤</h1>
        <button className="btn btn-logout" onClick={logout}>
          Logout
        </button>
      </div>

      {/* ================= PRODUCTS ================= */}
      <h2>Products 🛍️</h2>
      <div className="products">
        {products.map((p) => (
          <div className="card" key={p.id}>
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <b>₹{p.price}</b>
          </div>
        ))}
      </div>

      {/* ================= SERVICES ================= */}
      <h2 style={{ marginTop: "2rem" }}>Services ⚙️</h2>

      {services.length === 0 && <p>No services available.</p>}

      <div className="products">
        {services.map((s) => (
          <div className="card" key={s.id}>
            <h3>{s.name}</h3>
            <p>{s.description}</p>

            <small style={{ color: "#666" }}>
              {s.serviceType === "external"
                ? "🌐 External Service"
                : "🧠 Internal Service"}
            </small>

            <br /><br />

            <button
              className="btn btn-primary"
              onClick={() => openService(s)}
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

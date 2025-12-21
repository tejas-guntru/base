import { useEffect, useState } from "react";
import { getProducts } from "../firestore/products";
import { logout } from "../auth";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  query,
  where,
} from "firebase/firestore";
import { db, auth } from "../firebase";
import "./dashboard.css";

const UserPage = () => {
  // PRODUCTS
  const [products, setProducts] = useState([]);

  // SERVICES
  const [services, setServices] = useState([]);
  const [activeService, setActiveService] = useState(null);
  const [userInput, setUserInput] = useState("");

  // USER REQUESTS
  const [myRequests, setMyRequests] = useState([]);

  // LOAD PRODUCTS
  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  // LOAD SERVICES
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

  // LOAD ONLY THIS USER'S REQUESTS
  const loadMyRequests = async () => {
    const q = query(
      collection(db, "service_requests"),
      where("userId", "==", auth.currentUser.uid)
    );

    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    setMyRequests(data);
  };

  useEffect(() => {
    loadMyRequests();
  }, []);

  // SUBMIT SERVICE REQUEST
  const submitRequest = async () => {
    if (!userInput.trim()) {
      alert("Please describe your requirement");
      return;
    }

    await addDoc(collection(db, "service_requests"), {
      serviceId: activeService.id,
      serviceName: activeService.name,
      userId: auth.currentUser.uid,
      userInput,
      createdAt: serverTimestamp(),
    });

    alert("Request submitted successfully ✅");

    setUserInput("");
    setActiveService(null);
    loadMyRequests(); // 🔥 refresh requests list
  };

  return (
    <div className="page">
      <div className="header">
        <h1>User Dashboard 👤</h1>
        <button className="btn btn-logout" onClick={logout}>
          Logout
        </button>
      </div>

      {/* ---------------- PRODUCTS ---------------- */}
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

      {/* ---------------- SERVICES ---------------- */}
      <h2 style={{ marginTop: "2rem" }}>Services ⚙️</h2>

      {!activeService && (
        <div className="products">
          {services.map((s) => (
            <div className="card" key={s.id}>
              <h3>{s.name}</h3>
              <p>{s.description}</p>
              <button
                className="btn btn-primary"
                onClick={() => setActiveService(s)}
              >
                Use Service
              </button>
            </div>
          ))}
        </div>
      )}

      {activeService && (
        <div className="card" style={{ marginTop: "1rem" }}>
          <h3>{activeService.name}</h3>
          <p>{activeService.description}</p>

          <textarea
            placeholder="Describe your requirement..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            rows={5}
            style={{ width: "100%" }}
          />

          <br /><br />

          <button className="btn btn-primary" onClick={submitRequest}>
            Submit Request
          </button>
          <button
            className="btn"
            style={{ marginLeft: "1rem" }}
            onClick={() => setActiveService(null)}
          >
            Cancel
          </button>
        </div>
      )}

      {/* ---------------- MY REQUESTS ---------------- */}
      <h2 style={{ marginTop: "2rem" }}>My Requests 📄</h2>

      {myRequests.length === 0 && (
        <p>You haven’t submitted any requests yet.</p>
      )}

      <div className="products">
        {myRequests.map((r) => (
          <div className="card" key={r.id}>
            <h4>{r.serviceName}</h4>
            <p><b>Your Request:</b></p>
            <p>{r.userInput}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPage;

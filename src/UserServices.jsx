import { useEffect, useState } from "react";
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "./firebase"; // ⚠️ change path if firebase.js is elsewhere

const UserServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const snapshot = await getDocs(collection(db, "services"));

        console.log("SNAPSHOT SIZE:", snapshot.size);

        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("SERVICES DATA:", data);

        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const useService = async (service) => {
    try {
      await addDoc(collection(db, "service_usage"), {
        serviceId: service.id,
        serviceName: service.name,
        userId: auth.currentUser?.uid || "anonymous",
        usedAt: serverTimestamp(),
      });

      alert("Service used & logged!");
    } catch (error) {
      console.error("Error logging usage:", error);
      alert("Failed to log usage");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>User Services</h2>

      {loading && <p>Loading services...</p>}

      {!loading && services.length === 0 && (
        <p style={{ color: "red" }}>
          ❌ No services found.
          <br />
          Check Firestore → services collection.
        </p>
      )}

      {!loading &&
        services.map(service => (
          <div
            key={service.id}
            style={{
              border: "1px solid #ccc",
              padding: 10,
              marginBottom: 10,
              borderRadius: 6,
            }}
          >
            <b>{service.name}</b>
            <p>{service.description}</p>

            <button onClick={() => useService(service)}>
              Use Service
            </button>
          </div>
        ))}
    </div>
  );
};

export default UserServices;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

const ServicePage = () => {
  const { serviceSlug } = useParams();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      const servicePath = `/services/${serviceSlug}`;

      const q = query(
        collection(db, "services"),
        where("serviceUrl", "==", servicePath)
      );

      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        setService({
          id: snapshot.docs[0].id,
          ...snapshot.docs[0].data(),
        });
      }

      setLoading(false);
    };

    fetchService();
  }, [serviceSlug]);

  if (loading) return <h2>Loading service...</h2>;

  if (!service)
    return <h2>❌ Service not found</h2>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{service.name}</h1>
      <p>{service.description}</p>

      <hr />

      <p>
        ✅ Service loaded successfully.
        <br />
        Next we will add:
        <br />• input form
        <br />• submission
        <br />• output
      </p>
    </div>
  );
};

export default ServicePage;

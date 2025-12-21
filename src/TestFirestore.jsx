import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";

const TestFirestore = () => {
  const createService = async () => {
    await addDoc(collection(db, "services"), {
      name: "Frontend Service",
      description: "Created from frontend",
      isActive: true,
    });

    alert("Service created successfully");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Firestore Test</h2>
      <button onClick={createService}>
        Create Service
      </button>
    </div>
  );
};

export default TestFirestore;

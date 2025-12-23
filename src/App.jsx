import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { getUserRole } from "./getUserRole";

import Login from "./pages/Login";
import AdminPage from "./pages/AdminPage";
import UserPage from "./pages/UserPage";
import ServicePage from "./pages/ServicePage";

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setUser(null);
        setRole(null);
        setLoading(false);
        return;
      }

      setUser(currentUser);
      const r = await getUserRole(currentUser.uid);
      setRole(r);
      setLoading(false);
    });
  }, []);

  if (loading) return <h2>Loading...</h2>;

  return (
    <Routes>
      {/* LOGIN ROUTE — ALWAYS EXISTS */}
      <Route path="/login" element={<Login />} />

      {/* NOT LOGGED IN */}
      {!user && (
        <>
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}

      {/* ADMIN */}
      {user && role === "admin" && (
        <>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<Navigate to="/admin" />} />
        </>
      )}

      {/* USER */}
      {user && role === "user" && (
        <>
          <Route path="/user" element={<UserPage />} />
          <Route
            path="/services/:serviceSlug"
            element={<ServicePage />}
          />
          <Route path="*" element={<Navigate to="/user" />} />
        </>
      )}
    </Routes>
  );
}

export default App;

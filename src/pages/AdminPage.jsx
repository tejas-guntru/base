import { logout } from "../auth";

const AdminPage = () => {
  return (
    <div>
      <h1>Admin Dashboard 👑</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default AdminPage;

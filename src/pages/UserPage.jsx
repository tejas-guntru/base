import { logout } from "../auth";

const UserPage = () => {
  return (
    <div>
      <h1>User Dashboard 👤</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default UserPage;

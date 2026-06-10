import { useUser } from "../context/UserContext";

function Dashboard() {
  const { user } = useUser();

  return (
    <main>
      <h1>Dashboard</h1>

      <p>Welcome back{user?.username ? `, ${user.username}` : ""}.</p>

      <p>
        This is where pets and care information will appear
      </p>
    </main>
  );
}

export default Dashboard;
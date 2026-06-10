import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

function HomePage() {
  return (
    <main>
      <h1>PawPlanner</h1>
      <p>Organize pets, care routines, medications, and care events.</p>
    </main>
  );
}

function LoginPage() {
  return (
    <main>
      <h1>Login</h1>
      <p>Login form will go here.</p>
    </main>
  );
}

function SignupPage() {
  return (
    <main>
      <h1>Sign Up</h1>
      <p>Signup form will go here.</p>
    </main>
  );
}

function Dashboard() {
  return (
    <main>
      <h1>Dashboard</h1>
      <p>Protected dashboard placeholder.</p>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
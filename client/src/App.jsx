import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useUser } from "./context/UserContext";
import NavBar from "./components/NavBar";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function HomePage() {
  return (
    <main>
      <h1>PawPlanner</h1>
      <p>Organize your pets, care routines, medications, and care events.</p>
    </main>
  );
}

function ProtectedRoute({ children }) {
  const { user, isCheckingSession } = useUser();

  if (isCheckingSession) {
    return <main><p>Checking session...</p></main>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function RedirectIfLoggedIn({ children }) {
  const { user, isCheckingSession } = useUser();

  if (isCheckingSession) {
    return <main><p>Checking session...</p></main>;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/login"
          element={
            <RedirectIfLoggedIn>
              <LoginPage />
            </RedirectIfLoggedIn>
          }
        />

        <Route
          path="/signup"
          element={
            <RedirectIfLoggedIn>
              <SignupPage />
            </RedirectIfLoggedIn>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
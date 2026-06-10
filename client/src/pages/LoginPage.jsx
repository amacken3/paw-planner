import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

function LoginPage() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const navigate = useNavigate();
    const { login } = useUser();

    function handleChange(event) {
        setFormData({
        ...formData,
        [event.target.name]: event.target.value,
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");

        try {
        await login(formData);
        navigate("/dashboard");
        } catch (error) {
        setError(error.message);
        }
    }

    return (
        <main>
        <h1>Login</h1>

        {error ? <p className="error">{error}</p> : null}

        <form onSubmit={handleSubmit}>
            <label>
            Email
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
            />
            </label>

            <label>
            Password
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
            />
            </label>

            <button type="submit">Login</button>
        </form>

        <p>
            Need an account? <Link to="/signup">Sign up here.</Link>
        </p>
        </main>
    );
    }

export default LoginPage;
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

function SignupPage() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const navigate = useNavigate();
    const { signup } = useUser();

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
        await signup(formData);
        navigate("/dashboard");
        } catch (error) {
        setError(error.message);
        }
    }

    return (
        <main>
        <h1>Sign Up</h1>

        {error ? <p className="error">{error}</p> : null}

        <form onSubmit={handleSubmit}>
            <label>
            Username
            <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
            />
            </label>

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

            <button type="submit">Create Account</button>
        </form>

        <p>
            Already have an account? <Link to="/login">Log in here.</Link>
        </p>
        </main>
    );
}

export default SignupPage;
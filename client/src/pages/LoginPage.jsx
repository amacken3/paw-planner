import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import styles from "./AuthPage.module.css";

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
        <main className={styles.page}>
        <section className={styles.card}>
            <div className={styles.intro}>
            <p className={styles.kicker}>Welcome back</p>
            <h1>Log in to PawPlanner</h1>
            <p>
                Continue managing your pet profiles, routines, medications, and care
                events.
            </p>
            </div>

            {error ? <p className="error">{error}</p> : null}

            <form className={styles.form} onSubmit={handleSubmit}>
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

            <button className={styles.primaryButton} type="submit">
                Login
            </button>
            </form>

            <p className={styles.switchText}>
            Need an account? <Link to="/signup">Sign up here.</Link>
            </p>
        </section>
        </main>
    );
}

export default LoginPage;
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import styles from "./AuthPage.module.css";

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
        <main className={styles.page}>
        <section className={styles.card}>
            <div className={styles.intro}>
            <p className={styles.kicker}>Create account</p>
            <h1>Start planning your pet care</h1>
            <p>
                Create a PawPlanner account to save your pets, care routines,
                medications, and care events.
            </p>
            </div>

            {error ? <p className="error">{error}</p> : null}

            <form className={styles.form} onSubmit={handleSubmit}>
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

            <button className={styles.primaryButton} type="submit">
                Create Account
            </button>
            </form>

            <p className={styles.switchText}>
            Already have an account? <Link to="/login">Log in here.</Link>
            </p>
        </section>
        </main>
    );
}

export default SignupPage;
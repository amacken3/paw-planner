import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import styles from "./NavBar.module.css";

function NavBar() {
    const { user, logout } = useUser();

    return (
        <nav className={styles.nav}>
        <Link className={styles.brand} to="/">
            PawPlanner
        </Link>

        {user ? (
            <>
            <Link className={styles.link} to="/">
                Home
            </Link>
            <Link className={styles.link} to="/dashboard">
                Dashboard
            </Link>
            <button
                className={styles.logoutButton}
                type="button"
                onClick={logout}
            >
                Logout
            </button>
            </>
        ) : (
            <>
            <Link className={styles.link} to="/login">
                Login
            </Link>
            <Link className={styles.link} to="/signup">
                Sign Up
            </Link>
            </>
        )}
        </nav>
    );
}

export default NavBar;
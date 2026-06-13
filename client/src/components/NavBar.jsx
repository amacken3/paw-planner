import { NavLink } from "react-router-dom";
import { useUser } from "../context/UserContext";
import styles from "./NavBar.module.css";

function NavBar() {
    const { user, logout } = useUser();

    function getLinkClass({ isActive }) {
        return isActive ? `${styles.link} ${styles.activeLink}` : styles.link;
    }

    function getBrandClass({ isActive }) {
        return isActive ? `${styles.brand} ${styles.activeBrand}` : styles.brand;
    }

    return (
        <nav className={styles.nav}>
        <NavLink className={getBrandClass} to="/">
            PawPlanner
        </NavLink>

        {user ? (
            <>
            <NavLink className={getLinkClass} to="/dashboard">
                Dashboard
            </NavLink>

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
            <NavLink className={getLinkClass} to="/login">
                Log In
            </NavLink>

            <NavLink className={getLinkClass} to="/signup">
                Sign Up
            </NavLink>
            </>
        )}
        </nav>
    );
}

export default NavBar;
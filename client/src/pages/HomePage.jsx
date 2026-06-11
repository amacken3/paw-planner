import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import styles from "./HomePage.module.css";

function HomePage() {
    const { user } = useUser();

    return (
        <main className={styles.page}>
        <section className={styles.hero}>
            <div className={styles.heroContent}>
            <p className={styles.kicker}>Pet care made easier</p>

            <h1>Keep every pet’s care plan in one place.</h1>

            <p className={styles.subtitle}>
                PawPlanner helps pet owners organize profiles, routines,
                medications, and care events so daily pet care feels easier to
                manage.
            </p>

            <div className={styles.actions}>
                {user ? (
                <Link className={styles.primaryLink} to="/dashboard">
                    Go to Dashboard
                </Link>
                ) : (
                <>
                    <Link className={styles.primaryLink} to="/signup">
                    Get Started
                    </Link>

                    <Link className={styles.secondaryLink} to="/login">
                    Log In
                    </Link>
                </>
                )}
            </div>
            </div>

            <div className={styles.heroCard}>
            <p className={styles.kicker}>Mission</p>
            <h2>Built to make pet care feel less scattered.</h2>
            <p>
                PawPlanner gives pet owners a simple place to track the important
                details of each pet&apos;s care. Instead of keeping routines,
                medications, and care history in separate notes or memory, the app
                brings them together into one organized dashboard.
            </p>
            </div>
        </section>

        <section className={styles.featureGrid}>
            <article className={styles.featureCard}>
            <h3>Pet Profiles</h3>
            <p>
                Store each pet&apos;s basic details, notes, and care information in
                one place.
            </p>
            </article>

            <article className={styles.featureCard}>
            <h3>Care Plans</h3>
            <p>
                Track routines and medications so recurring care is easier to
                follow.
            </p>
            </article>

            <article className={styles.featureCard}>
            <h3>Care Timeline</h3>
            <p>
                Log scheduled and completed care events to keep a clear history.
            </p>
            </article>
        </section>
        </main>
    );
}

export default HomePage;
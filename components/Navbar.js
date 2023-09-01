import Link from 'next/link';
import styles from '../styles/Navbar.module.css';
import { useAuthContext } from "/utils/AuthContext";
import firebase_app from "/utils/firebaseconfig.js";
import { signOut, getAuth } from "firebase/auth";

const auth = getAuth(firebase_app);

const Navbar = () => {
    const { user } = useAuthContext()

    const handleSignOut = async () => {
        let result = null,
			error = null;
		try {
			result = await signOut(auth);
		} catch (e) {
			error = e;
		}

        console.log({ result, error });
    }

    return (
        <nav className={styles.navbar}>
            <div className={styles.navBrand}>
                <img src="/logo.png" alt="Logo" className={styles.brandLogo} />
                <span className={styles.brandName}>CeladonAI</span>
            </div>
            <ul className={styles.navList}>
                <li className={styles.navItem}>
                    <Link href="/" className={styles.navLink}>
                        Home
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="/dashboard" className={styles.navLink}>
                        Dashboard
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="/guide" className={styles.navLink}>
                        Guide
                    </Link>
                </li>
            </ul>
            <div className={styles.authButtons}>
                {user ? 
                <p>Logged in as <strong onClick={handleSignOut} style={{cursor: "pointer", textDecoration: "underline"}}>{user.email}</strong></p> 
                : 
                <>
                    <Link href="/auth/login"><button className={styles.authButton}>Login</button></Link>
                    <Link href="/auth/signup"><button className={styles.authButton}>Sign Up</button></Link>
                </>
                }
            </div>
        </nav>
    );
};

export default Navbar;

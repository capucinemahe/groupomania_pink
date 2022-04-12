import Link from "next/link";
import styles from "../styles/Home.module.css";


export default function NotFound() {
    return (
        <div className={styles.NF_container}>
            <h1 className={styles.NF_title}>404 NOT FOUND</h1>
            <h2>Sorry, cette page n'a pas été trouvée</h2>
            <Link href="/" className={styles.NF_title}>Clique ici pour retourner sur la page d'accueil</Link>
        </div>
    );
};
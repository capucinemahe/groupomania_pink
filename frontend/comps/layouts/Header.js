import styles from "./Header.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import logoPink from "../../assets/logo_home.png";
import iconeHome from "../../assets/icones/home.png";
import iconeProfil from "../../assets/icones/profile_user.png";
import iconeOff from "../../assets/icones/bouton_off.png";

export default function Header({ users }) {
  const router = useRouter();

  const logout = () => {
    localStorage.clear();
    router.push("/login");
  };

  return (
    <div className={styles.header_home}>
      <div className={styles.nav_icones}>
        <div className={styles.icones_left}>
          <Link href="/">
            <a className={styles.icone_home}>
              <Image src={iconeHome} alt="icone retour à l'accueil" />
            </a>
          </Link>

          <Link href="/profile">
            <a className={styles.icone_profile}>
              <Image src={iconeProfil} alt="icone de profil" />
            </a>
          </Link>
        </div>

        <div>
          <button onClick={logout} className={styles.icone_logout}>
            <Image src={iconeOff} alt="icone de déconnexion" />
          </button>
        </div>
      </div>

      <div className={styles.logopink}>
        <Image layout="responsive" src={logoPink} alt="Groupomania logo" priority/>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch(`http://localhost:8080/api/auth/users`);
  const users = await res.json();

  return {
    props: {
      users,
    },
  };
}

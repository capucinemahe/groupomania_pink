import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import styles from "/styles/Connexion.module.css";
import logoPink from "../assets/logo_home.png";

import MyHead from "../comps/layouts/MyHead";

export default function LoginForm() {
  const router = useRouter();

  //useState renvoie une paire de valeurs dans un tableau de 2 éléments
  //je déclare la variable input value et la fonction set qui va permettre de changer sa valeur dans le state local
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //"" état initial du state - peut etre un nombre, une string, un booléen, un tableau ou même un objet

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // j'appelle  preventDefault, sinon le submit rafraîchirait la page

    const userData = { email, password };

    axios({
      method: "POST",
      url: `http://localhost:8080/api/auth/login`,
      data: userData,
    })
      .then((res) => {
        if (res.status === 401) {
          return; //le code s'arrete ici - identifiants incorrects
        }
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("isAdmin", res.data.isAdmin);
        localStorage.setItem("userId", res.data.userId);

        router.push("/");
      })
      .catch((err) => {
        alert("Assurez-vous d'avoir bien saisi vos identifiants")
      });
  };

  return (
    <div className={styles.container}>
      <MyHead title={"Connectez-vous à Groupomania"} />

      <div className={styles.logopink}>
        <Image src={logoPink} alt="Groupomania logo" priority />
      </div>

      <div className={styles.formulaire}>
        <h1 className={styles.title}>Identifiez-vous</h1>

        <form action="" onSubmit={handleLoginSubmit}>
          <div className={styles.input_container}>
            <input
              type="email"
              id="email"
              className={styles.form_input}
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // j'accède à la valeur tapée dans l'input avec  e.target.value
              required
            />
          </div>

          <div className={styles.input_container}>
            <input
              type="password"
              id="password"
              className={styles.form_input}
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.btn_login}>
            Se connecter
          </button>

          <div className={styles.link_form}>
            <p>Pas encore de compte ?</p>
            <Link href="/signup">
              <a> S'inscrire</a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

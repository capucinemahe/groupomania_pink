import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import styles from "/styles/Connexion.module.css";
import logoPink from "../assets/logo_home.png";
import MyHead from "../comps/layouts/MyHead";

export default function SignUpForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [firstname, setFirstName] = useState("");

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    // j'appelle  preventDefault, sinon le submit rafraîchirait la page

    const userData = { email, password, name, firstname };

    axios({
      method: "POST",
      url: `http://localhost:8080/api/auth/signup`,
      data: userData,
    })
      .then(() => {
        axios
          .post(`http://localhost:8080/api/auth/login`, userData)
          //on utilise la fonction login une fois la création de l'user réussie
          .then((res) => {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("isAdmin", res.data.isAdmin);
            localStorage.setItem("userId", res.data.userId);
            router.push("/");
          });
      })
      .catch((err) => {
        alert("Vérifiez que cet email n'est pas déja utilisé ou que vous respectez les règles de création de mot de passe")
      });
  };

  return (
    <div className={styles.container}>
      <MyHead title={"Inscrivez-vous à Groupomania"} />

      <div className={styles.logopink}>
        <Image src={logoPink} alt="Groupomania logo" priority />
      </div>

      <div className={styles.formulaire}>
        <h1 className={styles.title}>Créer un compte</h1>

        <form action="" onSubmit={handleSignUpSubmit}>
          <div className={styles.input_container}>
            <input
              type="text"
              id="firstname"
              className={styles.form_input}
              placeholder="Prénom"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className={styles.input_container}>
            <input
              type="text"
              id="name"
              className={styles.form_input}
              placeholder="Nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className={styles.input_container}>
            <input
              type="email"
              id="email"
              className={styles.form_input}
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <p className={styles.form_last}>
          Votre mot de passe doit contenir minimum 6 caractères, <br/>1 majuscule et 1 chiffre au moins
          </p>

          <button type="submit" className={styles.btn}>
            Se connecter
          </button>

          <p className={styles.form_last}>
            Tous les champs sont obligatoires pour créer votre compte
            Groupomania
          </p>

          <div className={styles.link_form}>
            <p>Déja un compte ?</p>
            <Link href="/login">
              <a> S'identifier</a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

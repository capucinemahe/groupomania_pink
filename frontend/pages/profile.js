import Header from "../comps/layouts/Header";
import styles from "../styles/Users.module.css";
import axios from "axios";
import apiHeaders from "../utils/apiHeaders";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Profile() {
  const router = useRouter();

  const [user, setUser] = useState(null);

  const [bio, setBio] = useState("");
  const [imageUser, setImageUser] = useState(null);

  //l'evenement se déclenche quand on a un user
  //les premiers paramètres sont des fonctions à exécuter - va mettre à jour les données de l'user
  useEffect(() => {
    user && setBio(user.bio);
    user && setImageUser(user.imageUser);
  }, [user]);
  //décider précisément quand on veut déclencher l'effet

  const getUserProfile = () => {
    axios({
      method: "GET",
      url: `http://localhost:8080/api/auth/users/profile`,
      headers: apiHeaders().headers,
    })
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data.user);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //1er paramètre une fonction, puis un tableau de paramètres
  //si tableau vide, la fonction va etre exécutée une fois au début
  useEffect(() => {
    getUserProfile();
  }, []);

  const handleSubmitProfil = () => {
    const data = new FormData();
    data.append("bio", bio);
    data.append("imageuser", imageUser);

    axios({
      method: "PUT",
      url: `http://localhost:8080/api/auth/users/profile`,
      data: data,
      headers: apiHeaders(true).headers,
    })
      .then((res) => {
        if (res.status === 200) {
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteUserAccount = () => {
    let res = confirm("voulez-vous vraiment supprimer votre profil ?");
    if (res) {
      axios({
        method: "DELETE",
        url: `http://localhost:8080/api/auth/users/${user.id}`,
        headers: apiHeaders().headers,
      })
        .then((res) => {
          if (res.status === 200) {
            router.push("/login");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return user ? (
    <div key={user.id} className={styles.container_profile_user}>
      <Header />

      <p className={styles.user_names}>
        Bienvenue sur ton profil <br />
        {user.firstname} {user.name}
      </p>
      <img
        className={styles.user_image}
        src={user.imageuser}
        alt="image de l'utilisateur"
      />

      <form className={styles.form_profile}>
        <button
          className={styles.btn_modify_image}
          onClick={() => handleSubmitProfil()}
          type="button"
        >
          Modifier ma photo de profil
        </button>
        <input
          type="file"
          className={styles.input_user_image}
          onChange={(e) => {
            const file = e.target.files[0];
            setImageUser(file);
          }}
        />

        <div className={styles.bio}>
          <textarea
            type="text"
            className={styles.user_bio}
            placeholder={!user.bio ? "Rédigez votre bio" : "..."}
            onChange={(e) => setBio(e.target.value)}
            value={bio}
          ></textarea>

          <button
            onClick={() => handleSubmitProfil()}
            className={styles.btn_bio}
            type="button"
          >
            modifier ma biographie
          </button>
        </div>
      </form>

      <button
        type="button"
        className={styles.btn_delete_account}
        onClick={() => {
          deleteUserAccount(user.id);
        }}
      >
        Supprimer mon compte définitivement
      </button>
    </div>
  ) : (
    <p> Pas d'utilisateur trouvé </p>
  );
}

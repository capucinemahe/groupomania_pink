import styles from "../../styles/Home.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

import iconePoubelle from "../../assets/icones/trashcan_black.png";
import iconeModif from "../../assets/icones/modif.png";

import CreateComment from "../Comments/CreateComment";
import PostForm from "./PostForm";
import apiHeaders from "../../utils/apiHeaders";
import OneComment from "../Comments/OneComment";

export default function OnePost({ post, comments }) {

  //chemin sauvegarde images des posts
  const imageHostName = "http://localhost:8080/images/posts/"


  //permet de récupérer les infos du localStorage
  const [isAdmin, setIsAdmin] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    setIsAdmin(JSON.parse(localStorage.getItem("isAdmin")));
    setUserId(JSON.parse(localStorage.getItem("userId")));
  }, []);


  //state d'ouverture de la modale qui permet de modifier le post
  const [openEditModal, setOpenEditModal] = useState(false);
  const [postState, setPostState] = useState(post); //post modifié

  
  //fonction pour ouvrir la modale de modif du post
  const handleEditPost = () => {
    setOpenEditModal(true);
  };

  const isOwner = userId === post.Users_id;

  //fonction d'update de l'affichage du post une fois modifié
  const handleUpdatePost = (updatedPost) => {
    setOpenEditModal(false); //referme la modale
    setPostState(updatedPost); //état du nouveau contenu du post
  };

  const deletePost = () => {
    confirm("voulez-vous vraiment supprimer ce post ?");
    axios({
      method: "DELETE",
      url: `http://localhost:8080/api/posts/${post.id}`,
      headers: apiHeaders().headers,
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


  return (
    <>
      {openEditModal && (
        <div className={styles.modal_container}>
          <PostForm
            method={"PUT"}
            post={postState}
            updatePost={(updatedPost) => handleUpdatePost(updatedPost)}
          />
        </div> //la modale s'ouvre si je fais appel à la méthode PUT
      )}

      <div className={styles.container_onepost}>
        <div className={styles.content_post}>
          <img
            className={styles.user_image}
            src={post.User.imageuser}
            alt="image de l'utilisateur"
          />

          <div className={styles.card_content_right}>
            <p className={styles.user_name}>
              {post.User.firstname} {post.User.name}
            </p>

            <p className={styles.post_text}>{postState.content}</p>

{/* il y a déja une image présente dans le post initial ? */}
            {postState.attachment ? (
              <img
                className={styles.post_attachment}
                src={`${imageHostName}${postState.attachment}`}
                object-fit="cover"
                alt="image du post"
              />
            ) : null}
          </div>
        </div>

  
          <div className={styles.icones_right}>
            {isOwner && (
              <>
                <button
                  className={styles.icone_modif}
                  type="button"
                  onClick={() => handleEditPost()}
                >
                  <Image src={iconeModif} alt="icone pour modifier le post" />
                </button>
              </>
            )}

            {(isAdmin || isOwner) && (
              <>
                <button
                  className={styles.icone_poubelle}
                  type="button"
                  onClick={() => {
                    deletePost(postState.id);
                  }}
                >
                  <Image
                    src={iconePoubelle}
                    alt="icone pour supprimer le post"
                  />
                </button>
              </>
            )}
          </div>
       

        <div className={styles.under_post}>
     
          <CreateComment post={postState} />

       {/* //si ya des comms je boucle, sinon non */}
      {post.Comments.length > 0 && post.Comments.map((comment) => (
        <OneComment comment={comment} key={comment.id} />
      ))} 
        </div>
      </div>
    </>
  );
}

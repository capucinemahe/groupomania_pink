import styles from "../../styles/Home.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

import iconeModif from "../../assets/icones/modif.png";
import iconePoubelle from "../../assets/icones/trashcan_black.png";
import CreateComment from "./CreateComment";
import apiHeaders from "../../utils/apiHeaders";

export default function OneComment({ comment }) {

  const [commState, setCommState] = useState(comment); //commentaire modifié

  const [openEditCommModal, setOpenEditCommModal] = useState(false);

    //permet de récupérer les infos du localStorage
  const [isAdmin, setIsAdmin] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    setIsAdmin(JSON.parse(localStorage.getItem("isAdmin")));
    setUserId(JSON.parse(localStorage.getItem("userId")));
  }, []);

  //fonction pour ouvrir la modale de modif du commentaire
  const handleEditComm = () => {
    setOpenEditCommModal(true)
  };

  const handleUpdateComm = (updatedComm) => {
  setCommState(updatedComm)
  setOpenEditCommModal(false)
  };

  const deleteComment = (commentId) => {
    confirm("voulez-vous vraiment supprimer ce commentaire ?");
    axios({
      method: "DELETE",
      url: `http://localhost:8080/api/comments/${commentId}`,
      headers: apiHeaders().headers,
    })
      .then((res) => {
        if (res.status === 200) {
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {openEditCommModal && (
        <div className={styles.modal_container}>
          <CreateComment
            isEditMode={true}
            comment={commState}
            updateComm={(updatedComm) => handleUpdateComm(updatedComm)}
          />
        </div>
      )}

      <div className={styles.comment_card}>
        <div className={styles.comment_card_top}>
          <img
            className={styles.comment_user_image}
            src={comment.User.imageuser}
            alt="image de l'utilisateur"
          />

          <div className={styles.comment_right}>
            <p className={styles.comment_user_name}>
            {comment.User.firstname} {comment.User.name}
            </p>

            <p>{commState.content}</p>
          </div>
        </div>

        <div className={styles.icones_comment}>
          {userId === comment.Users_id && (
            <>
              <button
                className={styles.icone_comment_modif}
                type="button"
                onClick={() => handleEditComm()}
              >
                <Image
                  src={iconeModif}
                  alt="icone pour modifier le commentaire"
                />
              </button>
            </>
          )}

          {(isAdmin || userId == comment.Users_id) && (
            <>
              <button
                className={styles.icone_trash_comment}
                type="button"
                onClick={() => {
                  deleteComment(comment.id);
                }}
              >
                <Image
                  src={iconePoubelle}
                  alt="icone pour supprimer le commentaire"
                />
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

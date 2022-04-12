import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../styles/CreateComment.module.css";
import apiHeaders from "../../utils/apiHeaders";

export default function CreateComment({ post, comment, updateComm, isEditMode }) {

  const [content, setContent] = useState("");

  useEffect(() => {
    comment && setContent(comment.content); //s'il y a un commentaire, alors le content va se mettre à jour
  }, [comment]);
  //dès que comment change, la fonction va s'exécuter

  const handleSubmit = () => {
    const data = {content}

    //si je ne suis pas en mode edit, le content du post reste inchangé
    if(!isEditMode){
      data.postId = post.id
    }
    axios({
      method: isEditMode ? "PUT" : "POST",
      url: `http://localhost:8080/api/comments/${isEditMode ? comment.id : ""}`,
      data,
      headers: apiHeaders(false).headers,
      // pas de multipart form-data
    })
      .then((res) => {
        if (res.status === 201) {
          window.location.reload();
        }
        if (res.status === 200) {
          updateComm(res.data.comment);
        }
      })
      .catch((err) => {
        alert("Veuillez écrire quelque chose")
      });
  };

  return (
    <div className={styles.container_create_comment}>
      <div className={styles.create_comment}>
        <textarea
          type="text"
          rows="2"
          cols="30"
          className={styles.form_input_comment}
          placeholder={!comment ? "Laissez un commentaire" : ""}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>

        <div className={styles.btn_comment}>
          <button onClick={() => handleSubmit()} className={styles.btn_post_comment}>
            publier
          </button>
        </div>
      </div>
    </div>
  );
}

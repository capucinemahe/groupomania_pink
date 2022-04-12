import styles from "../../styles/CreatePost.module.css";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import iconeUpload from "../../assets/icones/add_pj.png";
import apiHeaders from "../../utils/apiHeaders";

export default function PostForm({ method, post, updatePost }) {
  
  const [content, setContent] = useState("");
  const [attachment, setAttachment] = useState("");

  useEffect(() => {
    post && setContent(post.content); //s'il y a un post, alors le content va se mettre à jour
    post && setAttachment(post.attachment);
  }, [post]);
  //dès que post change, la fonction va s'exécuter

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("content", content);
    formData.append("attachment", attachment);

    const postId = post ? post.id : "";
    axios({
      method: method,
      url: `http://localhost:8080/api/posts/${postId}`,
      data: formData,
      headers: apiHeaders(true).headers,
    })
      .then((res) => {
        if (res.status === 201) {
          window.location.reload();
        }
        if (res.status === 200) {
          updatePost(res.data.post);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.container_create}>
      <form className={styles.create_post} onSubmit={handleSubmit}>
      <label htmlFor=""></label>
        <textarea
          type="text"
          rows="4"
          cols="30"
          className={styles.form_input}
          placeholder={!post ? "Hello, quoi de neuf ? ... " : ""}
          //si post est vide : "Hello .." sinon valeur du content
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>

        <div className={styles.container_icones}>
        <label htmlFor=""></label>
          <input
            type="file"
            className={styles.input_attachment}
            onChange={(e) => {
              const file = e.target.files[0];
              setAttachment(file);
            }}
          />

          <div className={styles.icone_attachment}>
            <Image src={iconeUpload} alt="icone pour ajouter une image" />
          </div>
        </div>

        <div className={styles.btn_submit}>
          <button type="submit" className={styles.btn_post}>
            publier{" "}
          </button>
        </div>

        
      </form>
    </div>
  );
}

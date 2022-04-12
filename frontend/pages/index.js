import styles from "../styles/Home.module.css";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// COMPONENTS
import MyHead from "../comps/layouts/MyHead";
import Header from "../comps/layouts/Header";
import PostForm from "../comps/Posts/PostForm";
import OnePost from "../comps/Posts/OnePost";

export default function Home({ posts, post }) {
  const router = useRouter();

//fait en sorte que j'arrive sur la page login si localStorage est vide
  useEffect(() => {
    if(!localStorage.getItem("userId")) {
      router.push("/login");
    }
  }, []);


  return (
    <div className={styles.container_home}>
      <MyHead title={"Bienvenue sur Groupomania"} />
      <Header />

      <PostForm method={"POST"} />

      {posts.map((post) => (
        <OnePost post={post} key={post.id} />
      ))}

      <footer className={styles.footer}>
        <p> Capucine Mahé - Groupomania - 2022</p>
      </footer>
    </div>
  );
}

//je récupère les données des posts grace aux staticprops
export async function getStaticProps() {
  const res = await fetch(`http://localhost:8080/api/posts`);
  const posts = await res.json();

  return {
    props: {
      posts,
    },
    revalidate: 15, //va rafraichir toutes les 15 sec
  };
}

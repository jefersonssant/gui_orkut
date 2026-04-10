import { useEffect, useState } from "react";
import api from "../../services/api";
import Post from "../../components/post/Post";
import s from "./Home.module.scss";

export default function Home() {
  const [posts, setPosts] = useState([]);

  

  useEffect(() => {
    async function carregarPosts() {
    const res = await api.get("/posts");
    setPosts(res.data);
  }

    carregarPosts();
  }, []);

  return (
    <div className={s.home}>
      <h1>Posts</h1>
      {posts.map((post) => (
        <Post key={post.post_id} post={post} />
      ))}
    </div>
  );
}
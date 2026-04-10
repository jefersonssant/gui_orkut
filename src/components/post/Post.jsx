import s from "./Post.module.scss";

export default function Post({ post }) {
  return (
    <div className={s.post}>
      <h3>{post.titulo}</h3>
      <p>{post.conteudo}</p>
      <small>Por: {post.nome}</small>
    </div>
  );
}
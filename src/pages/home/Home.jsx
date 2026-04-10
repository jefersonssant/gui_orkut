import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Post from "../../components/post/Post";
import s from "./Home.module.scss";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function carregarPosts() {
      try{
        const res = await api.get("/posts");
        setPosts(res.data);
      } catch (error) {
        console.log("Erro ao carregar posts" + error);
      }
    }
    carregarPosts();
  }, []);

  //Editar ou criar nova postagem
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (editandoId) {
        // PUT (editar)
        const res = await api.put(`/posts/${editandoId}`, {
          titulo,
          conteudo,
        });

        setPosts((prev) =>
          prev.map((post) =>
            post.post_id === editandoId ? res.data.post : post
          )
        );

        setEditandoId(null);
      } else {
        // POST (criar)
        const res = await api.post("/posts", { titulo, conteudo });

        setPosts((prev) => [res.data.post, ...prev]);
      }

      setTitulo("");
      setConteudo("");
    } catch {
      alert("Erro ao salvar post");
    }
  }

  // Iniciar edição
  function handleEdit(post) {
    setTitulo(post.titulo);
    setConteudo(post.conteudo);
    setEditandoId(post.post_id);
  }

  async function handleDelete(id) {
    const confirmacao = confirm("Tem certeza que deseja excluir este post");
    if (!confirmacao) return;

    try {
      await api.delete(`/posts/${id}`);

      //Remove do estado sem precisar buscar novamente
      setPosts((prev) => prev.filter((post) => post.post_id !== id));
    } catch (error) {
      alert("Erro ao deletar post" + error);
    }
  }

  function handleLogout() {
    logout();          // remove token
    navigate("/login"); // redireciona
  }

  return (
    <>
      <div className={s.home}>
        <h1>Feed</h1>
        <button className={s.btn} onClick={handleLogout}>
          Sair
        </button>
      </div>
      {/* FORM DE POSTAGEM */}
        <form className={s.postForm} onSubmit={handleSubmit}>
          <input
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />

          <textarea
            placeholder="O que você está pensando?"
            value={conteudo}
            onChange={(e) => setConteudo(e.target.value)}
          />

          <button type="submit">{editandoId ? "Atualizar Post" : "Postar"}</button>

          {editandoId && (
            <button
              type="button"
              className="cancel"
              onClick={() => {
                setEditandoId(null);
                setTitulo("");
                setConteudo("");
              }}
            >
              Cancelar
            </button>
          )}
        </form>

        {/* LISTA DE POSTS */}
        <div className={s.postsContainer}>
          {posts.length === 0 ? (
            <p className={s.empty}>Nenhum post ainda...</p>
          ) : (
            posts.map((post) => (
              <Post key={post.post_id} post={post} onEdit={handleEdit} onDelete={handleDelete}/>
            ))
          )}
        </div>
    </>
  );
}
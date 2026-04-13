//import { useState, useContext } from "react";
// api from "../../services/api";
//import { AuthContext } from "../../context/AuthContext";
import s from "./Login.module.scss";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // { login } = useContext(AuthContext);
  // [email, setEmail] = useState("");
  // [senha, setSenha] = useState("");
  const navigate = useNavigate();
  
  // async function handleLogin(e) {
  //   e.preventDefault();

  //   try {
  //     const res = await api.post("/login", { email, senha });
  //     login(res.data.token);
  //     alert("Login realizado!");
  //      navigate("/"); 
  //   } catch {
  //     alert("Erro ao logar");
  //   }
  // }

  return (
    <div className={s.loginContainer}>
      <form onSubmit={}> {/*handleLogin*/}
        <h2>Login</h2>
        <input placeholder="Email" onChange={} /> {/*(e) => setEmail(e.target.value)*/}
        <input type="password" placeholder="Senha" onChange={} /> {/*(e) => setSenha(e.target.value)*/}
        <button>Entrar</button>
      </form>
      <div>
        <h6>Não tem cadastro? Crie um:</h6>
        <button onClick={() => (navigate("/cadastro"))}>Cadastre-se</button>
      </div>
    </div>
  );
}
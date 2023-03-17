import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // sauvegarder username dans le localstorage du navigateur
    localStorage.setItem("userId", username);
    setUsername("");

    // redirect vers Tasks page
    navigate("/task");
  };

  return (
    <div className="login__container">
      <h1>KANBAN</h1>
      <form className="login__form" onSubmit={handleLogin}>
        <label htmlFor="username">Entrez votre nom</label>
        <input
          type="text"
          name="username"
          id="username"
          required
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <button>Connexion</button>
      </form>
    </div>
  );
};

export default Login;

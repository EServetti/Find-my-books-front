import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";
import viewImg from "../assets/view.png";
import hideImg from "../assets/hide.png";
import googleImg from "../assets/google.png"
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import login from "../services/login.service";
import google from "../services/google.service";

function Login() {
  const navigate = useNavigate();

  //Redirección en caso de que el user ya este logeado
  const { user, setChange, change } = useContext(UserContext);
  if (user) {
    navigate("/");
  }

  //Mostrar u ocultar password
  const [password, setPassword] = useState(true);
  function handlePassword(e) {
    e.preventDefault();
    setPassword(!password);
  }

  //Manejo de valores de inputs
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  //Manejo de login
  const [logError, setLogError] = useState(null);

  function handleLogin(e) {
    e.preventDefault();
    login(formData, setLogError, navigate, setChange, change);
  }

  //Manejo de login con Google
  function handleGoogle() {
    google()
  }

  return (
    <div className="main-login">
      <section className="login-benefits">
        <h1>Why should I log in?</h1>
        <ul>
          <li>To read list: save the books you like to read later</li>
          <li>
            Manage your books: you can have a list of books and mark if you red
            them
          </li>
          <li>
            Share your list: share and recomend your books with your friends
          </li>
        </ul>
      </section>
      <aside className="login">
        <h2>Log in</h2>
        <form>
          <input
            type="text"
            onChange={handleChange}
            name="email"
            id="email"
            placeholder="Entrer your email"
          />
          <span className="password">
            <input
              onChange={handleChange}
              type={password ? "password" : "text"}
              name="password"
              id="password"
              placeholder="Enter your password"
            />
            <button onClick={handlePassword}>
              <img src={password ? viewImg : hideImg} alt="view" />
            </button>
          </span>
          {logError ? <span className="login-error">{logError}</span> : <></>}
          <button onClick={handleLogin}>Log in</button>
        </form>
        <span>or</span>
        <span className="google">
          <button onClick={handleGoogle}>Continue with Google <img src={googleImg} alt="google" /></button>
        </span>
        <Link to="/recover">Have you lost your password? click here</Link>
      </aside>
    </div>
  );
}

export default Login;

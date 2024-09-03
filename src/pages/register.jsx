import "../styles/register.css";
import viewImg from "../assets/view.png";
import hideImg from "../assets/hide.png";
import googleImg from "../assets/google.png";
import { UserContext } from "../context/UserContext";
import { useContext, useState } from "react";
import google from "../services/google.service";
import { useNavigate } from "react-router-dom";
import register from "../services/register.service";

function Register() {
  const navigate = useNavigate()
  //Redirección en caso de que el user ya este logeado
  const { user } = useContext(UserContext);
  if (user) {
    navigate("/");
  }

  //Manejo de valores de inputs
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    password2: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  //Mostrar u ocultar password
  const [password, setPassword] = useState(true);
  function handlePassword(e) {
    e.preventDefault();
    setPassword(!password);
  }

  //Manejo de Registro
  const [logError, setLogError] = useState(null);

  function handleRegister(e) {
    e.preventDefault();
    register(formData, setLogError, navigate);
  }

  //Manejo de login con Google
  function handleGoogle() {
    google();
  }
  return (
    <div className="main-register">
      <section className="register-welcome">
        <h1>Welcome to Find your Books!</h1>
        <p>
          Register and get started on the page for book lovers. Here, you'll be
          able to find any book you desire, save it, and share it with your
          friends!
        </p>
      </section>
      <aside className="register">
        <h2>Register</h2>
        <p>Fill the following form to get started</p>
        <form>
          <input
            onChange={handleChange}
            type="text"
            name="email"
            id="email"
            placeholder="Entrer your email"
          />
          <input
            onChange={handleChange}
            type="text"
            name="name"
            id="name"
            placeholder="Entrer your user name"
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
          <input
            onChange={handleChange}
            type={password ? "password" : "text"}
            name="password2"
            id="password2"
            placeholder="Repeat your password"
          />
          {logError ? <span className="login-error">{logError}</span> : <></>}
          <button onClick={handleRegister}>Register</button>
        </form>
        <span>or</span>
        <span className="google">
          <button onClick={handleGoogle}>
            Continue with Google <img src={googleImg} alt="google" />
          </button>
        </span>
      </aside>
    </div>
  );
}

export default Register;

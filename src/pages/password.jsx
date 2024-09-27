import { useState } from "react";
import "../styles/recover.css";
import { useParams } from "react-router-dom";
import viewImg from "../assets/view.png"
import hideImg from "../assets/hide.png"
import updatePassword from "../services/updatePassword";

function Password() {
  const { token } = useParams();
  const [showPassword, setShowPassword] = useState(null)
  const [password, setPassword] = useState({
    pass1: "",
    pass2: ""
  })
  const [error, setError] = useState(null)

  
  function handleChange(e) {
    const { name, value } = e.target;
    setPassword({
      ...password,
      [name]: value,
    });
  }

  function handlePassword(e) {
    e.preventDefault()
    setShowPassword(!showPassword)
  }

  function handleUpdate(e) {
    e.preventDefault()
    updatePassword(token, password, setError)
  }

  return (
    <div className="main-recover">
      <h3>Update your password</h3>
      <form>
        <label htmlFor="pass1">Enter your new password</label>
        <span className="password-recover">
          <input
            onChange={handleChange}
            type={showPassword ? "password" : "text"}
            name="pass1"
            id="pass1"
            placeholder="Create a password"
          />
          <button onClick={handlePassword}>
            <img src={showPassword ? viewImg : hideImg} alt="view" />
          </button>
        </span>
        <input
            onChange={handleChange}
            type={showPassword ? "password" : "text"}
            name="pass2"
            id="pass2"
            placeholder="Repeat the password"
        />
        <button onClick={handleUpdate}>Update</button>
      </form>
      {error && <span className="error">{error}</span>}
    </div>
  );
}

export default Password;

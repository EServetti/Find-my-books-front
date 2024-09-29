import { useState } from "react";
import "../styles/recover.css";
import recover from "../services/recoverPassword";

function Recover() {
  //Manejo de recuperacion de contraseña
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");


  function handleChange(e) {
    setEmail(e.target.value);
  }

  function handleClick(e) {
    e.preventDefault();
    recover(email, setError, setLoading);
  }
  return (
    <div className="main-recover">
      <h3>If you lost your password, you can change it here:</h3>
      <form>
        <label htmlFor="email">Enter the email of the account</label>
        <input type="text" name="email" id="email" onChange={handleChange} />
        {error && <span className="error">{error}</span>}
        {loading && <span>...Loading</span>}
        <button onClick={handleClick}>Recover</button>
      </form>
    </div>
  );
}

export default Recover;

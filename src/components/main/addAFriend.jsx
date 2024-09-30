import lookFriend from "../../services/lookFriend"
import addFriend from "../../services/addFriend"
import { useState } from "react";
import glass from "./src/assets/glass.png"
import addUser from "./src/assets/add-user.png"

function AddAFriend() {
  //Manejo de busqueda de amigos
  const [inpValue, setInpValue] = useState("");
  const [foundUser, setFoundUser] = useState(null);
  const [error, setError] = useState(null);
  function handleChange(e) {
    setInpValue(e.target.value);
  }
  function handleClick() {
    lookFriend(inpValue, setError, setFoundUser);
  }
  //Manejo de agregación de amigo
  function handleAddFriend(_id) {
    addFriend(_id, setError);
  }
  return (
    <section className="add-a-friend">
      <span className="look-a-friend">
        <input
          type="text"
          placeholder="Enter the email of a user"
          value={inpValue}
          onChange={handleChange}
        />
        <button onClick={handleClick}>
          <img src={glass} alt="glass" />
        </button>
      </span>
      {error && <span className="error">{error}</span>}
      <section className="users-list">
        {!foundUser && (
          <>
            <h3>To add your friend:</h3>
            <ul>
              <li>Enter correctly the email</li>
              <li>Send the solicitude</li>
              <li>Wait him to accept</li>
            </ul>
          </>
        )}
        {foundUser &&
          foundUser.map((user, index) => (
            <div className="found-user" key={index}>
              <img
                className="found-user-img"
                src={user.photo}
                alt="user photo"
              />
              <section className="found-user-info">
                <span>{user.name}</span>
                <span>{user.email}</span>
              </section>
              <button
                className="add-span"
                onClick={() => handleAddFriend(user._id)}
              >
                Send request{" "}
                <img src={addUser} alt="add user" />
              </button>
            </div>
          ))}
      </section>
    </section>
  );
}

export default AddAFriend
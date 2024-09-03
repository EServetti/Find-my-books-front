import "../styles/verify.css";
import { useParams } from "react-router-dom";
import useVerify from "../hooks/verify";
import { Link } from "react-router-dom";

function Verify() {
  const { email, verifyCode } = useParams();
  const { message, loading } = useVerify(email, verifyCode);

  return (
    <div className="main-verify">
      {loading ? (
        <h3>Loading...</h3>
      ) : message.statusCode !== 200 ? (
        <h3>{message.message}</h3>
      ) : (
        <section>
          <h3>{message.message}</h3>
          <Link to="/login">You can log in now!</Link>
        </section>
      )}
    </div>
  );
}

export default Verify;

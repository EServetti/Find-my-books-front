import { Link } from "react-router-dom"

function LogedAdmin() {
    return (
        <nav>
          <span className="navBar-title">Find your books</span>
          <Link to="/">Home</Link>
          <span>Admin</span>
        </nav>
    )
}

export default LogedAdmin
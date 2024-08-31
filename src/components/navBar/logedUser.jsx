import { Link } from "react-router-dom"

function LogedUser() {
    return (
        <nav>
          <span className="navBar-title">Find your books</span>
          <Link to="/">Home</Link>
          <span>User</span>
        </nav>
    )
}

export default LogedUser
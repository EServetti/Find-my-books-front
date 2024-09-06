import { Link } from "react-router-dom"

function NoLoged() {
    return (
        <nav>
          <section className="nav-no-loged">
          <span className="navBar-title">Find your books</span>
          <Link to="/">Home</Link>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
          </section>
        </nav>
    )
}

export default NoLoged
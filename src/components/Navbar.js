import { Link } from "react-router-dom"

// styles and images
import "./Navbar.css"
import Temple from "../assets/temple.svg"

const Navbar = () => {
  return (
    <nav className="navbar">
        <ul>
            <li className="logo">
                <img src={Temple} alt="project-logo" />
                <span>The Sam</span>
            </li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
            <li><button className="btn">Logout</button></li>
        </ul>
    </nav>
  )
}

export default Navbar
import { Link } from "react-router-dom"
import {useLogout} from "../hooks/useLogout"

// styles and images
import "./Navbar.css"
import Temple from "../assets/temple.svg"

const Navbar = () => {
  const {isLoading, logout} = useLogout()
  return (
    <nav className="navbar">
        <ul>
            <li className="logo">
                <img src={Temple} alt="project-logo" />
                <span>The Sam</span>
            </li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
            {isLoading && <li><button className="btn" disabled>Logging out...</button></li>}
            {!isLoading && <li><button className="btn" onClick={logout}>Logout</button></li>}
        </ul>
    </nav>
  )
}

export default Navbar
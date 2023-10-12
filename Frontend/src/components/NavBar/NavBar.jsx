import { Link } from "react-router-dom";
import "./style.css";

const Navbar = () => {
  return (
    <div className="nav-container">
      <nav className="navbar">
        <Link to={"/"}>
        <h1 className="navbar-logo">Shop.</h1>
        </Link>
        <div className="seeCarrito">
          <Link className="seeCarrito" to={"/login"}>
            👥
          </Link>
          <Link className="seeCarrito" to={"/cart"}>
            🛒
            {/* {cart.length > 0 ? <TotalItems/> : null} */}
            
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
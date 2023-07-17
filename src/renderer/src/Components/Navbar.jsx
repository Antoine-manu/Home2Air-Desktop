import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from "react-router-dom";
import logo from '../assets/img/logo_blanc_administrateur.png'

export default function Navbar() {

    let activeClassName = "active";

    const disconnect = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      location.reload()
    };

    return(
        <>
            <header>
                <nav className="navbar">
                  <div>
                    <img src={logo} />
                    <ul>
                      <li>
                        <NavLink
                          to="/"
                          // className={({ isActive }) => isActive ? activeClassName : undefined }
                        >
                          <FontAwesomeIcon icon="fa-solid fa-wind" /> Mes capteurs
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/profil">
                          <FontAwesomeIcon icon="fa-solid fa-user" /> Mon profil
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/notifications">
                          <FontAwesomeIcon icon="fa-solid fa-bell" /> Notifications
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/tickets">
                          <FontAwesomeIcon icon="fa-solid fa-ticket" /> Mes tickets
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                  <NavLink to="/" onClick={() => disconnect() }>
                      Se déconnecter <FontAwesomeIcon icon="fa-solid fa-arrow-right-from-bracket" />
                  </NavLink>
                </nav>
            </header>
        </>
    )
}

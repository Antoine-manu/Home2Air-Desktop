import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from "react-router-dom";
import logo from '../assets/img/logoAdmin.svg'

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
                    <img className="align-self-center" style={{width: "90%"}} src={logo} />
                    <ul>
                      <li>
                        <NavLink
                          to="/"
                          // className={({ isActive }) => isActive ? activeClassName : undefined }
                        >
                          <FontAwesomeIcon icon="fa-solid fa-house" /> Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/sensors"
                        >
                          <FontAwesomeIcon icon="fa-solid fa-wind" /> Mes capteurs
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/spaces">
                          <FontAwesomeIcon icon="fa-solid fa-layer-group" /> Mes espaces
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
                    </ul>
                  </div>
                  <a className="pointer-event" onClick={() => disconnect() }>
                      Se déconnecter <FontAwesomeIcon icon="fa-solid fa-arrow-right-from-bracket" />
                  </a>
                </nav>
            </header>
        </>
    )
}

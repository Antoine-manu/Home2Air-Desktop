import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from "react-router-dom";

export default function Navbar() {
    
    let activeClassName = "active";

    return(
        <>
            <header>
                <nav className="navbar">
                <img src={process.env.PUBLIC_URL + '/img/logo_normal.png'} />
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
                    <NavLink to="/disconnect">
                        Se déconnecter <FontAwesomeIcon icon="fa-solid fa-arrow-right-from-bracket" />
                    </NavLink>
                </nav>
            </header>
        </>
    )   
}
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {fetchRoute} from "../../Utils/auth";
import {useEffect, useState} from "react";

export default function Profil() {
  const [user, setUser] = useState([]);
  const [token, setToken] = useState(
    localStorage.getItem('token') ? localStorage.getItem('token') : ''
  );
  const [uid, setUid] = useState(
    localStorage.getItem('userId') ? localStorage.getItem('userId') : ''
  );


  const getUser = async () => {
    const userAwait = await fetchRoute(
      "user/find-one-by-id",
      "post",
      {
        id: uid
      },
      token
    );
    console.log(userAwait)
    setUser(userAwait);
  };

  useEffect(() => {
    getUser()
    console.log("user " + user)
  }, [])

    return(
        <>
            <div className="profil">
                <h1>Mon profil</h1>
                <div className="profil__form">
                    <div className="form-layout-mid justify-content-start">
                        <div className="form-layout-mid__top">
                            <h3>Informations personnelles</h3>
                            <a className="text-secondary pointer-event"><FontAwesomeIcon icon="fa-solid fa-pen-to-square"/></a>
                        </div>
                        <div className="form-group mb-3">
                            <label for="name" className="form-label">Prénom</label>
                            <input type="text" defaultValue={user.first_name} disabled className="form-control" id="name" placeholder="Théo"/>
                        </div>
                        <div className="form-group mb-3">
                            <label for="surname" className="form-label">Nom</label>
                            <input type="text" defaultValue={user.first_name} disabled className="form-control" id="surname" placeholder="Nom"/>
                        </div>
                        <div className="form-group mb-3">
                            <label for="email" className="form-label">Email</label>
                            <input type="email" defaultValue={user.email} disabled className="form-control" id="email" placeholder="Email"/>
                        </div>
                        <button className="btn btn-secondary mt-3">Changer votre mot de passe</button>
                    </div>
                    <div className="form-layout-mid">
                        <div className="form-layout-mid__top">
                            <h3>Informations professionelles</h3>
                            <a className="text-secondary pointer-event"><FontAwesomeIcon icon="fa-solid fa-pen-to-square" /></a>
                        </div>
                        <div className="form-group mb-3">
                            <label for="nameownercompany" className="form-label">Prénom</label>
                            <input type="text" className="form-control" defaultValue={user.first_name} disabled id="nameownercompany" placeholder="Théo"/>
                        </div>
                        <div className="form-group mb-3">
                            <label for="surnameownercompany" className="form-label">Nom</label>
                            <input type="text" className="form-control" defaultValue={user.last_name} disabled id="surnameownercompany" placeholder="Nom"/>
                        </div>
                        <div className="form-group mb-3">
                            <label for="adresse" className="form-label">Adresse</label>
                            <input type="text" className="form-control" defaultValue={""} id="adresse" disabled/>
                        </div>
                        <div className="row mb-3">
                            <div className="form-group col-8">
                                <label for="city" className="form-label">Ville</label>
                                <input type="text" className="form-control" defaultValue={""} id="city" disabled/>
                            </div>
                            <div className="form-group col-4">
                                <label for="postalCode" className="form-label">Code postal</label>
                                <input type="number" className="form-control" defaultValue={""} id="postalCode" disabled/>
                            </div>
                        </div>
                        <div className="form-group mb-3">
                            <label for="adresse" className="form-label">Nom de la société</label>
                            <input type="text" className="form-control" defaultValue={""} id="companyname" disabled/>
                        </div>
                        <div className="form-group mb-3">
                            <label for="phone" className="form-label">Numéro de telephone</label>
                            <input type="number" className="form-control" defaultValue={""} id="phone" disabled/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

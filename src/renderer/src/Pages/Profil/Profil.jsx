import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {fetchRoute} from "../../Utils/auth";
import React, {useEffect, useState} from "react";
import {Button, Modal} from "react-bootstrap";

export default function Profil() {
  const [user, setUser] = useState([]);
  const [company, setCompany] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showUser, setShowUser] = useState(true);
  const [showCompany, setShowCompany] = useState(true);
  const [firstname, setFirstname] = useState()
  const [lastname, setLastname] = useState()
  const [email, setEmail] = useState()
  const [companyName, setCompanyName] = useState()
  const [companyUserName, setCompanyUserName] = useState()
  const [companyUserLastName, setCompanyUserLastName] = useState()
  const [companyAddress, setCompanyAddress] = useState()
  const [companyCity, setCompanyCity] = useState()
  const [companyPostal, setCompanyPostal] = useState()
  const [companyPhone, setCompanyPhone] = useState()
  const [token, setToken] = useState(
    localStorage.getItem('token') ? localStorage.getItem('token') : ''
  );
  const [uid, setUid] = useState(
    localStorage.getItem('userId') ? localStorage.getItem('userId') : ''
  );

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const editUser = () => {
    if(showUser == true) {
      setShowUser(false)
    } else {
      setShowUser(true)
    }
  };

  const editCompany = () => {
    if(showCompany == true){
      setShowCompany(false)
    } else {
      setShowCompany(true)
    }
  };

  const updateUserData = async () => {
    try {
      const response = await fetchRoute(
        `user/update/${user.id}`,
        'post',
        {
          first_name: firstname,
          last_name: lastname,
          email: email,
        },
        token
      );
      if (response) {
        console.log(response);
        editUser()
      }
    } catch (error) {
      console.error('erroor ' , error);
    }
  };

  const updateCompanyData = async () => {
    try {
      const response = await fetchRoute(
        `company/update/${user.id}`,
        'post',
        {
          first_name: companyUserName,
          last_name: companyUserLastName,
          name: companyName,
          phone: companyPhone,
          address: companyAddress,
          city: companyCity,
          zipcode: companyPostal,
        },
        token
      );
      if (response) {
        console.log(response);
        editCompany()
      }
    } catch (error) {
      console.error('erroor ' , error);
    }
  };


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

  const getCompany = async () => {
    const companyAwait = await fetchRoute(
      "company/find-one-by-user-id",
      "post",
      {
        id: uid
      },
      token
    );
    setCompany(companyAwait);
    setCompanyPostal(company.zipcode)
    setCompanyName(company.name)
    setCompanyPhone(company.phone)
    setCompanyUserLastName(company.last_name)
    setCompanyUserName(company.first_name)
    setCompanyAddress(company.address)
    setCompanyCity(company.city)
  };

  useEffect(() => {
    getUser()
    getCompany()
  }, [])

    return(
        <>
            <div className="profil">
                <h1>Mon profil</h1>
                <div className="profil__form">
                    <div className="form-layout-mid justify-content-start">
                        <div className="form-layout-mid__top">
                            <h3>Informations personnelles</h3>
                            <a className="text-primary pointer-event" style={{display: showUser ? 'block' : 'none'}} onClick={editUser}><FontAwesomeIcon icon="fa-solid fa-pen-to-square"/></a>
                            <a className="text-secondary pointer-event mt-1" style={{display: showUser ? 'none' : 'block'}} onClick={editUser}><FontAwesomeIcon icon="fa-solid fa-xmark"/></a>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="name" className="form-label">Prénom</label>
                            <input type="text" defaultValue={user.first_name} onChange={(e) => {setFirstname(e.target.value)}} disabled={showUser} className="form-control" id="name"/>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="surname" className="form-label">Nom</label>
                            <input type="text" defaultValue={user.last_name} onChange={(e) => {setLastname(e.target.value)}} disabled={showUser} className="form-control" id="surname"/>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" defaultValue={user.email} onChange={(e) => {setEmail(e.target.value)}} disabled={showUser} className="form-control" id="email"/>
                        </div>
                        <button className="btn btn-outline-primary mt-3" onClick={handleShowModal}>Changer votre mot de passe</button>
                        <button className="btn btn-primary mt-4" onClick={updateUserData} style={{display: showUser ? 'none' : 'block'}}>Enregistrer</button>
                    </div>
                    <div className="form-layout-mid">
                        <div className="form-layout-mid__top">
                            <h3>Informations professionelles</h3>
                            <a className="text-primary pointer-event" style={{display: showCompany ? 'block' : 'none'}} onClick={editCompany}><FontAwesomeIcon icon="fa-solid fa-pen-to-square" /></a>
                            <a className="text-secondary pointer-event mt-1" style={{display: showCompany ? 'none' : 'block'}} onClick={editCompany}><FontAwesomeIcon icon="fa-solid fa-xmark" /></a>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="nameownercompany" className="form-label">Prénom</label>
                            <input type="text" className="form-control" defaultValue={companyUserName} onChange={(e) => {setCompanyUserName(e.target.value)}} disabled={showCompany} id="nameownercompany"/>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="surnameownercompany" className="form-label">Nom</label>
                            <input type="text" className="form-control" defaultValue={companyUserLastName} onChange={(e) => {setCompanyUserLastName(e.target.value)}} disabled={showCompany} id="surnameownercompany"/>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="adresse" className="form-label">Adresse</label>
                            <input type="text" className="form-control" defaultValue={companyAddress} onChange={(e) => {setCompanyAddress(e.target.value)}} id="adresse" disabled={showCompany}/>
                        </div>
                        <div className="row mb-3">
                            <div className="form-group col-8">
                                <label htmlFor="city" className="form-label">Ville</label>
                                <input type="text" className="form-control" defaultValue={companyCity} onChange={(e) => {setCompanyCity(e.target.value)}} id="city" disabled={showCompany}/>
                            </div>
                            <div className="form-group col-4">
                                <label htmlFor="postalCode" className="form-label">Code postal</label>
                                <input type="number" className="form-control" defaultValue={companyPostal} onChange={(e) => {setCompanyPostal(e.target.value)}} id="postalCode" disabled={showCompany}/>
                            </div>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="adresse" className="form-label">Nom de la société</label>
                            <input type="text" className="form-control" defaultValue={companyName} onChange={(e) => {setCompanyName(e.target.value)}} id="companyname" disabled={showCompany}/>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="phone" className="form-label">Numéro de telephone</label>
                            <input type="number" className="form-control" defaultValue={companyPhone} onChange={(e) => {setCompanyPhone(e.target.value)}} id="phone" disabled={showCompany}/>
                        </div>
                        <button className="btn btn-primary mt-2" onClick={updateCompanyData} style={{display: showCompany ? 'none' : 'block'}}>Enregistrer</button>
                    </div>
                  <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                      <Modal.Title>Un email vous a été envoyé</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                      <Button variant="danger" onClick={handleCloseModal}>
                        Fermer
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
            </div>
        </>
    )
}

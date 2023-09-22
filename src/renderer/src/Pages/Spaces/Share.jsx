import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {fetchRoute} from "../../Utils/auth";
import React, {useEffect, useState} from "react";
import ShareItem from './ShareItem'
import {Button, Modal} from "react-bootstrap";

export default function Share(props) {

  const [_default, setDefault] = useState(props.default);
  const [users, setUsers] = useState([]);
  const [invites, setInvites] = useState([]);
  const [search, setSearch] = useState([]);
  const [showModal, setShowModal] = useState(false);
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

  const share = async id => {
    const jsonData = {
      userTo_id : id,
      user_id : uid,
      place_id : props.default.id
    };
    console.log(jsonData)
    const response = await fetchRoute(
      'place/invite',
      'POST',
      jsonData,
      token
    );
    if(response){
      inviteList()
      userList()
    }
  }

  const userList = async () => {
    const jsonData = {
      name : search,
      place_id : _default.id
    };
    const response = await fetchRoute(
      'user/find-by',
      'POST',
      jsonData,
      token
    );
    if(response){
      setUsers(response)
    }
  }

  const inviteList = async () => {
    const jsonData = {
      id : props.default.id
    };
    //le find-by-user c'est un find par place...
    const response = await fetchRoute(
      'invite/find-by-user',
      'POST',
      jsonData,
      token
    );
    if(response){
      setInvites(response)
    }
  }

  useEffect(() => {
    if (showModal == true){
      inviteList();
      userList()
    }
  }, [showModal]);

  useEffect(() => {
    userList()
  }, [search]);

  return(
    <>
      <button className="btn btn-outline-warning me-2" onClick={handleShowModal}><FontAwesomeIcon icon="fa-solid fa-share-nodes text-light"/></button>
      <Modal show={showModal} size={"l"} onHide={handleCloseModal} >
        <Modal.Header closeButton>
          <Modal.Title>Editer l'espace {props.default.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label className="form-label" htmlFor="">Partager l'espace</label>
          <input type="text" className="form-control" onChange={(e) => {setSearch(e.target.value)}}/>
          <div style={{maxHeight: '60vh', overflow: 'auto'}}>
            {users.length > 0 ?
              <ul className="list-group mt-4">
                {users.map(user =>
                  props.default.createdBy == user.id ? "" :
                    user.InvitesRecieved.length>0 ?
                      user.InvitesRecieved.map(invite =>
                        invite.place_id == props.default.id ?
                          <li key={user.id} className={invite.isAccpected == true ? "list-group-item d-flex flex-row justify-content-between align-items-center bg-primary" : "list-group-item d-flex flex-row justify-content-between align-items-center bg-warning" } >
                              <div className="d-flex flex-column">
                                <span className="text-light">{user.first_name} {user.last_name}</span>
                                <small className="text-light"> {user.email}</small>
                              </div>
                            {invite.isAccpected == true ?
                              <FontAwesomeIcon icon="fa-solid fa-check-circle" inverse/>
                              :
                              <FontAwesomeIcon icon="fa-solid fa-hourglass" inverse/>}
                          </li>
                          : ""
                      ) :
                      <ShareItem user={user} submit={share} space={props.default}/>
                )}
              </ul>

              :
            ""
            }
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

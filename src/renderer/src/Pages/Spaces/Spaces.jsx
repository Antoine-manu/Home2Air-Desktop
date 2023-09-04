import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {fetchRoute} from "../../Utils/auth";
import RoomAdd from './RoomAdd'
import RoomEdit from './RoomEdit'
import RoomDelete from './RoomDelete'
import Edit from './Edit'
import Share from './Share'
import Create from './Create'
import Delete from './Delete'
import React, {useEffect, useState} from "react";

export default function Spaces() {

  const [places, setPlaces] = useState([]);
  const [_default, setDefault] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [token, setToken] = useState(
    localStorage.getItem('token') ? localStorage.getItem('token') : ''
  );
  const [uid, setUid] = useState(
    localStorage.getItem('userId') ? localStorage.getItem('userId') : ''
  );

  const getPlacesList = async (defaultId = null) => {
    const placeList = await fetchRoute(
      'place/find-user-place',
      'post',
      {
        user_id: uid
      },
      token
    );
    setPlaces(placeList);
    if (placeList.length > 0) {
      if(defaultId == null){
        setDefault(placeList[0]);
      } else {
        placeList.map(place => {
            if (place.id == defaultId){
              setDefault(place);
            }
          }
        )
      }
    }
  };

  const searchRooms = async (pid) => {
    const r = await fetchRoute('room/find-by-place', 'post', { place: pid }, token);
    setRooms(r);
  };

  useEffect(() => {
    getPlacesList();
  }, []);

  useEffect(() => {
    searchRooms(_default.id);
  }, [_default]);

    return(
        <>
          <div className="d-flex flex-row justify-content-between align-items-center">
            <h1 className="mt-1">Vos espaces</h1>
            <div>
              <Create submit={getPlacesList} setDefault={setDefault}/>
            </div>
          </div>
          <div className="mt-3 d-flex flex-row flex-wrap align-items-center">
            {places.length > 0 ?
              places.map(place =>
                <button key={'place'+place.id} onClick={() => setDefault(place)} className={_default.id == place.id ? "btn me-2 shadow-sm btn-primary" : "btn me-2 shadow-sm btn-light"}>
                  <span>{place.name}</span>
                </button>
                )
            :
              <div>
                <span className="text-secondary">Vous n'avez aucun espace, ajoutez-en un !</span>
              </div>}
          </div>
          <hr/>
          <div className="mt-3 mb-3 d-flex flex-row justify-content-between align-items-center">
            <span >Liste de vos pièces dans l'espace</span>
            <div>
              {places.length > 0 ? <RoomAdd default={_default} places={places} submit={searchRooms}/>  : ""}
              {places.length > 0 ? <Share default={_default} space={places} submit={searchRooms}/>  : ""}
              {places.length > 0 ?<Edit space={_default} submit={getPlacesList}/> : ""}
              {places.length > 0 ?<Delete space={_default} submit={getPlacesList}/> : ""}
            </div>
          </div>
          <div className="d-flex flex-row flex-wrap">
            {rooms.length > 0 ?
              rooms.map(room =>
                <div className="singleSpace bg-light me-4 mt-3" key={'room'+room.id}>
                  <span>{room.name}</span>
                  <div>
                    <RoomEdit room={room} submit={searchRooms}/>
                    <RoomDelete room={room} submit={searchRooms}/>
                  </div>
                </div>
              )
              :
              <div>
                <span className="text-secondary">Aucune piece n'est reliée a cet espace</span>
              </div>
            }
          </div>
        </>
    )
}

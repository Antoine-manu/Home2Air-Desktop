import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import image from '../../assets/img/dashboardImage.svg'
import { Line } from 'react-chartjs-2';
import LineChart from "../../Components/LineChart";
import Clock from "../../Components/Clock";
import Timer from "../../Components/Timer";
import CustomSVG from "../../Components/ImageDesktop";
import BarMultipleChart from "../../Components/BarMultipleChart";
import React, {useEffect, useState} from 'react';
import { Button, Modal, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {fetchRoute} from "../../Utils/auth";
export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [places, setPlaces] = useState([]);
  const [sensorConfigItem, setSensorConfigItem] = useState([]);
  const [mainWidgetData, setMainWidgetData] = useState([]);
  const [sensorConfig, setSensorConfig] = useState();
  const [rooms, setRooms] = useState([]);
  const [_default, setDefault] = useState([]);

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

  const handleShowConfigModal = () => {
    setShowConfigModal(true);
  };

  const handleCloseConfigModal = () => {
    setShowConfigModal(false);
  };

  const searchRooms = async () => {
    const r = await fetchRoute('room/find-by-place', 'post', { place: _default.id }, token);
    setRooms(r);
    return r;
  };

  const getPlacesList = async (defaultSpace = null) => {
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
      if(defaultSpace != null){
        placeList.map(place =>
          {
            if(place.id == defaultSpace){
              setDefault(place)
            }
          }
        )
      } else {
        setDefault(placeList[0]);
      }
    }
  };

  const getSensorConfig = async (id) => {
   const response = await fetchRoute(
        `sensor/find-one-by-id`,
        'post',
        {
          id: id,
        },
        token
      );
    if (response) {
      setSensorConfigItem(response)
      const aqi = await fetchRoute(
        `probe`,
        'post',
        {
          address: "192.168.1.2",
        },
        token
      );
      setMainWidgetData(aqi)
      console.log(aqi)
    }
  };

  const updateConfig = async () => {
   const response = await fetchRoute(
        `place/update/${_default.id}`,
        'post',
        {
          config: parseInt(sensorConfig),
        },
        token
      );
    if (response) {
      getPlacesList(_default.id)
      handleCloseModal()
    }
  };

  useEffect(() => {
    getPlacesList();
  }, []);

  useEffect(() => {
    searchRooms();
    if(_default.config != null){
      getSensorConfig(_default.config)
    }
  }, [_default]);

  return(
    <div className="dashboard">
      <div className="d-flex flex-row align-items-center mb-3">
        <h1 className="mt-1">{_default.name}</h1>
        <Dropdown>
          <Dropdown.Toggle id="dropdown-basic"></Dropdown.Toggle>

          <Dropdown.Menu>
            {places.map(place =>
              place.id != _default.id ?
                <Dropdown.Item key={place.id} onClick={() => setDefault(place)}>{place.name}</Dropdown.Item>
              :
              ""
            )}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="dashboard_layout">
        <div className="dashboard_layout_col">
          <div className="dashboard_box dashboard_box_large">
            {_default.config == null ?
              <div className="d-flex flex-row justify-content-center align-items-center widgetMain_empty">
                <button className="btn btn-primary" onClick={handleShowModal}>Selectionnez un capteur</button>
              </div>
              :
              mainWidgetData[0] != null ?
                <div className="widgetMain">
                  <div className={parseInt(mainWidgetData[2][2]) < 33 ? "widgetMain_top bg-danger" : parseInt(mainWidgetData[2][2]) < 66 ? "widgetMain_top bg-warning" : "widgetMain_top bg-success" }>
                    <a className="widgetMain_top_gear">
                      <FontAwesomeIcon icon="fa-solid fa-gear" onClick={handleShowModal} className="widgetMain_top_content_head_icon"/>
                    </a>
                    <div className="widgetMain_top_content d-flex flex-column">
                      <div className="d-flex flex-row widgetMain_top_content_head">
                        <div className="d-flex flex-column">
                          <Clock />
                          <span className="widgetMain_top_content_head_name">Capteur {sensorConfigItem.name}</span>
                          {sensorConfigItem.Room != null ?
                            <span className="widgetMain_top_content_head_location">{sensorConfigItem.Room.name}, {sensorConfigItem.Room.Place.name}</span>
                            : ""}
                        </div>
                      </div>
                      <div className="d-flex flex-column widgetMain_top_content_mid">
                        <div className="d-flex flex-row align-items-center">
                          <span className="widgetMain_top_content_mid_data">{parseInt(mainWidgetData[2][2])} <span className="widgetMain_top_content_mid_aqi">AQI</span></span>
                        </div>
                        <span className="widgetMain_top_content_mid_quality">Qualité {mainWidgetData[2][1]}</span>
                      </div>
                    </div>
                    <div className="widgetMain_top_image">
                      <CustomSVG data={parseInt(mainWidgetData[2][2])}/>
                    </div>
                  </div>
                  <div className="widgetMain_mid">
                    <span className="widgetMain_mid_title">Donnée en temps réel</span>
                    <Timer />
                  </div>
                  <div className="widgetMain_bottom">
                    <div className={"widgetMain_tile"}>
                      <div className="d-flex flex-row align-items-center">
                        <FontAwesomeIcon icon={"fa-solid fa-cloud"} className="widgetMain_tile_icon"/>
                        <div className="widgetMain_tile_content">
                          <span className="widgetMain_tile_content_title">1.0 PM</span>
                          <span className={Math.round(mainWidgetData[1]["particules0"]) < 30 ? "widgetMain_tile_content_data text-danger" : Math.round(mainWidgetData[1]["particules0"]) < 60 ? "widgetMain_tile_content_data text-warning" : "widgetMain_tile_content_data text-success"}>{Math.round(mainWidgetData[1]["particules0"])}</span>
                          <span className="widgetMain_tile_content_unite"><span className="fw-bold widgetMain_tile_content_unite_u">u</span>g/m²</span>
                        </div>
                      </div>
                      <div className="widgetMain_tile_bar">
                        <div className="widgetMain_tile_bar_bg"></div>
                        <div className={Math.round(mainWidgetData[1]["particules0"]) < 30 ? "widgetMain_tile_bar_full bg-danger" : Math.round(mainWidgetData[1]["particules0"]) < 60 ? "widgetMain_tile_bar_full bg-warning" : "widgetMain_tile_bar_full bg-success"} style={{height : Math.round(mainWidgetData[1]["particules0"])*100/95 + '%'}}></div>
                      </div>
                    </div>
                    <div className={"widgetMain_tile"}>
                      <div className="d-flex flex-row align-items-center">
                        <FontAwesomeIcon icon={"fa-solid fa-cloud"} className="widgetMain_tile_icon"/>
                        <div className="widgetMain_tile_content">
                          <span className="widgetMain_tile_content_title">2.5 PM</span>
                          <span className={Math.round(mainWidgetData[1]["particules1"]) < 100 ? "widgetMain_tile_content_data text-danger" : Math.round(mainWidgetData[1]["particules1"]) < 300 ? "widgetMain_tile_content_data text-warning" : "widgetMain_tile_content_data text-success"}>{Math.round(mainWidgetData[1]["particules1"])}</span>
                          <span className="widgetMain_tile_content_unite"><span className="fw-bold widgetMain_tile_content_unite_u">u</span>g/m²</span>
                        </div>
                      </div>
                      <div className="widgetMain_tile_bar">
                        <div className="widgetMain_tile_bar_bg"></div>
                        <div className={Math.round(mainWidgetData[1]["particules1"]) < 100 ? "widgetMain_tile_bar_full bg-danger" : Math.round(mainWidgetData[1]["particules1"]) < 300 ? "widgetMain_tile_bar_full bg-warning" : "widgetMain_tile_bar_full bg-success"}style={{height : Math.round(mainWidgetData[1]["particules1"])*100/500 + '%'}}></div>
                      </div>
                    </div>
                    <div className={"widgetMain_tile"}>
                      <div className="d-flex flex-row align-items-center">
                        <FontAwesomeIcon icon={"fa-solid fa-cloud"} className="widgetMain_tile_icon"/>
                        <div className="widgetMain_tile_content">
                          <span className="widgetMain_tile_content_title">10 PM</span>
                          <span className={Math.round(mainWidgetData[1]["particules2"]) < 200 ? "widgetMain_tile_content_data text-danger" : Math.round(mainWidgetData[1]["particules2"]) < 400 ? "widgetMain_tile_content_data text-warning" : "widgetMain_tile_content_data text-success"}>{Math.round(mainWidgetData[1]["particules2"])}</span>
                          <span className="widgetMain_tile_content_unite"><span className="fw-bold widgetMain_tile_content_unite_u">u</span>g/m²</span>
                        </div>
                      </div>
                      <div className="widgetMain_tile_bar">
                        <div className="widgetMain_tile_bar_bg"></div>
                        <div className={Math.round(mainWidgetData[1]["particules2"]) < 200 ? "widgetMain_tile_bar_full bg-danger" : Math.round(mainWidgetData[1]["particules2"]) < 400 ? "widgetMain_tile_bar_full bg-warning" : "widgetMain_tile_bar_full bg-success"} style={{height : Math.round(mainWidgetData[1]["particules2"])*100/600 + '%'}}></div>
                      </div>
                    </div>
                    <div className={"widgetMain_tile"}>
                      <div className="d-flex flex-row align-items-center">
                        <FontAwesomeIcon icon={"fa-solid fa-temperature-quarter"} className="widgetMain_tile_icon"/>
                        <div className="widgetMain_tile_content">
                          <span className="widgetMain_tile_content_title">Degrès</span>
                          <span className={Math.round(mainWidgetData[1]["temperature"]) < 10 ? "widgetMain_tile_content_data text-danger" : Math.round(mainWidgetData[1]["temperature"]) < 20  ? "widgetMain_tile_content_data text-warning" : "widgetMain_tile_content_data text-success"}>{Math.round(mainWidgetData[1]["temperature"])}</span>
                          <span className="widgetMain_tile_content_unite">° C</span>
                        </div>
                      </div>
                      <div className="widgetMain_tile_bar">
                        <div className="widgetMain_tile_bar_bg"></div>
                        <div className={Math.round(mainWidgetData[1]["temperature"]) < 10 ? "widgetMain_tile_bar_full bg-danger" : Math.round(mainWidgetData[1]["temperature"]) < 20  ? "widgetMain_tile_bar_full bg-warning" : "widgetMain_tile_bar_full bg-success"} style={{height : Math.round(mainWidgetData[1]["temperature"])*100/45 + '%'}}></div>
                      </div>
                    </div>
                    <div className={"widgetMain_tile"}>
                      <div className="d-flex flex-row align-items-center">
                        <FontAwesomeIcon icon={"fa-solid fa-droplet-slash"} className="widgetMain_tile_icon"/>
                        <div className="widgetMain_tile_content">
                          <span className="widgetMain_tile_content_title">Humidité</span>
                          <span className={Math.round(mainWidgetData[1]["humidity"]) < 20 ? "widgetMain_tile_content_data text-danger" : Math.round(mainWidgetData[1]["humidity"]) < 60  ? "widgetMain_tile_content_data text-warning" : "widgetMain_tile_content_data text-success"}>{Math.round(mainWidgetData[1]["humidity"])}</span>
                          <span className="widgetMain_tile_content_unite"><span className="fw-bold widgetMain_tile_content_unite_u">g</span>/m3</span>
                        </div>
                      </div>
                      <div className="widgetMain_tile_bar">
                        <div className="widgetMain_tile_bar_bg"></div>
                        <div className={Math.round(mainWidgetData[1]["humidity"]) < 20 ? "widgetMain_tile_bar_full bg-danger" : Math.round(mainWidgetData[1]["humidity"]) < 60  ? "widgetMain_tile_bar_full bg-warning" : "widgetMain_tile_bar_full bg-success"} style={{height : Math.round(mainWidgetData[1]["humidity"])*100/90 + '%'}}></div>
                      </div>
                    </div>
                    <div className={"widgetMain_tile"}>
                      <div className="d-flex flex-row align-items-center">
                        <FontAwesomeIcon icon={"fa-solid fa-sun"} className="widgetMain_tile_icon"/>
                        <div className="widgetMain_tile_content">
                          <span className="widgetMain_tile_content_title">Lumière</span>
                          <span className={Math.round(mainWidgetData[1]["light"]) < 20 ? "widgetMain_tile_content_data text-danger" : Math.round(mainWidgetData[1]["light"]) < 60  ? "widgetMain_tile_content_data text-warning" : "widgetMain_tile_content_data text-success"}>{Math.round(mainWidgetData[1]["light"])}</span>
                          <span className="widgetMain_tile_content_unite">lm</span>
                        </div>
                      </div>
                      <div className="widgetMain_tile_bar">
                        <div className="widgetMain_tile_bar_bg"></div>
                        <div className={Math.round(mainWidgetData[1]["light"]) < 20 ? "widgetMain_tile_bar_full bg-danger" : Math.round(mainWidgetData[1]["light"]) < 60  ? "widgetMain_tile_bar_full bg-warning" : "widgetMain_tile_bar_full bg-success"} style={{height : Math.round(mainWidgetData[1]["light"])*100/90 + '%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
                : ""
            }
          </div>
          <div className="dashboard_box dashboard_box_small">
            <div className="widgetComparator">
              <div className="widgetComparator_head row align-items-center ms-3 me-3 mt-3">
                <span className="col-4">Comparatif d'air</span>
                <div className="widgetComparator_head_select row col-8">
                  <div className="col-4">
                    <select disabled className="form-select me-1" name="first" id="first">
                      <option value="">Exterieur</option>
                    </select>
                  </div>
                  <div className="col-8">
                    <select name="" id="" className="form-select"></select>
                  </div>
                </div>
              </div>
              <div className="widgetComparator_content">
                <span>Qualité de l'air extérieur</span>
                <div className="widgetComparator_content_widget">
                  <div className="widgetComparator_content_widget_data">
                    <span className="widgetComparator_content_widget_data_span">90</span>
                  </div>
                  <div className="widgetComparator_content_widget_content">
                    <span>Excellente qualité</span>
                    <div className="widgetComparator_content_widget_content_badge">
                      <div className="widgetComparator_content_widget_content_badge_single">
                        <FontAwesomeIcon icon="fa-solid fa-large fa-temperature-half"/>
                      </div>
                      <div className="widgetComparator_content_widget_content_badge_single">
                        <FontAwesomeIcon icon="fa-solid fa-cloud"/>
                      </div>
                      <div className="widgetComparator_content_widget_content_badge_single">
                        <FontAwesomeIcon icon="fa-solid fa-droplet"/>
                      </div>
                    </div>
                  </div>
                </div>
                <span>Qualité de l'air dans Chambre</span>
                <div className="widgetComparator_content_widget">
                  <div className="widgetComparator_content_widget_data">
                    <span className="widgetComparator_content_widget_data_span">90</span>
                  </div>
                  <div className="widgetComparator_content_widget_content">
                    <span>Excellente qualité</span>
                    <div className="widgetComparator_content_widget_content_badge">
                      <div className="widgetComparator_content_widget_content_badge_single">
                        <FontAwesomeIcon icon="fa-solid fa-large fa-temperature-half"/>
                      </div>
                      <div className="widgetComparator_content_widget_content_badge_single">
                        <FontAwesomeIcon icon="fa-solid fa-cloud"/>
                      </div>
                      <div className="widgetComparator_content_widget_content_badge_single">
                        <FontAwesomeIcon icon="fa-solid fa-droplet"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard_layout_col">
          <div className="dashboard_box dashboard_box_small d-flex flex-column justify-content-between">
            <div className="d-flex flex-row ps-4 pe-4 pt-2 align-items-center justify-content-between">
              <span className="col-5">Données sur la derniere semaine</span>
              <div className="widgetComparator_head_select row col-7">
                <div className="col-4">
                  <select className="form-select me-1" name="first" id="first">
                    <option value="">CO2</option>
                  </select>
                </div>
                <div className="col-8">
                  <select name="" id="" className="form-select"></select>
                </div>
              </div>
            </div>
            <LineChart/>
          </div>
          <div className="dashboard_box dashboard_box_large pt-3">
            <BarMultipleChart rooms={rooms}/>
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Paramètres du widget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor="mainWidgetInput" className="form-label">Capteur à afficher</label>
          <select className="form-select" onChange={(e) => {setSensorConfig(e.target.value)}  }>
            {rooms.map(room =>
              <optgroup label={room.name} key={'selectRoom' + room.id}>
                {room.Sensor.map(sensor =>
                  <option key={'selectSensor' + sensor.id} selected={sensor.id == _default.config ? true : false} value={sensor.id}>{sensor.name}</option>
                )}
              </optgroup>
            )}
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fermer
          </Button>
          <Button variant="primary" onClick={updateConfig}>
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

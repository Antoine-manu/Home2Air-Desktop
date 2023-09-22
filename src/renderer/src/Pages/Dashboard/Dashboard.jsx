import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import image from '../../assets/img/dashboardImage.svg'
import { Line } from 'react-chartjs-2';
import Weather from "../../Components/Weather";
import Clock from "../../Components/Clock";
import Timer from "../../Components/Timer";
import CustomSVG from "../../Components/ImageDesktop";
import BarMultipleChart from "../../Components/BarMultipleChart";
import React, {useEffect, useState} from 'react';
import { Button, Modal, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {fetchRoute} from "../../Utils/auth";
import axios from 'axios';
export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [places, setPlaces] = useState([]);
  const [sensorConfigItem, setSensorConfigItem] = useState([]);
  const [sensorCompareConfig, setSensorCompareConfig] = useState();
  const [sensorCompare, setSensorCompare] = useState();
  const [citySearch, setCitySearch] = useState("Amiens");
  const [citys, setCitys] = useState([]);
  const [mainWidgetData, setMainWidgetData] = useState([]);
  const [sensorConfig, setSensorConfig] = useState();
  const [rooms, setRooms] = useState([]);
  const [_default, setDefault] = useState([]);
  const [aqi, setAqi] = useState(Math.floor(Math.random() * (100 - 90 + 1)) + 90);
  const [weather, setWeather] = useState(null);
  let [sunset, setSunset] = useState(null);
  let [sunrise, setSunrise] = useState(null);

  const apiKey = '398b5113c4e291ebc507086d4239f018'; // Remplacez par votre propre clé API
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${apiKey}`;

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

  const fetchProbeDatas = async (address) => {
    const [addressSplited, name] = address.split("$")
    setSensorCompareConfig(name)
    const response = await fetchRoute('probe/', 'post', { address: addressSplited }, token);
    const array = [];
    if(response != null){
      console.log(response)
      setSensorCompare(response)
    }
  }

  const weatherCall = async () => {
    document.getElementById('weatherInput').classList.remove('is-invalid')
    axios.get(url)
      .then(response => {
        setWeather(response.data)
        setSunset(new Date(response.data.sys.sunset * 1000));
        setSunrise(new Date(response.data.sys.sunrise * 1000));
        console.log(response)
      })
      .catch(error => {
        console.error('Error fetching AQI:', error);
        document.getElementById('weatherInput').classList.add('is-invalid')
      });
  }

  const cityCall = async () => {
    const urlC = `https://api-adresse.data.gouv.fr/search/?q=${citySearch}&type=municipality&autocomplete=1`
    axios.get(urlC)
      .then(response => {
        let datas = response.data.features
        let array = []
        datas.map(c =>
          array.push({
            name : c.properties.city,
            cp : c.properties.citycode
          })
        )
        setCitys(array)
      })
      .catch(error => {
        console.error('Error fetching AQI:', error);
      });
  }

  useEffect(() => {
    getPlacesList();
    weatherCall()
  }, []);

  useEffect(() => {
    if(citySearch.length > 3) {
      setTimeout(() => console.log('Initial timeout!'), 500);
      cityCall()
    } else {
      setCitys([])
    }
  }, [citySearch]);

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
                  </div>
                  <div className="col-8">
                    <select className="form-select" onChange={(e) => {fetchProbeDatas(e.target.value)}}>
                      <option value="null" disabled selected>Capteur</option>
                      {rooms.map(room =>
                        <optgroup label={room.name} key={'selectRoomCompare' + room.id}>
                          {room.Sensor.map(sensor =>
                            <option key={'selectSensorCompare' + sensor.id} value={sensor.address + '$' + sensor.name}>{sensor.name}</option>
                          )}
                        </optgroup>
                      )}
                    </select>
                  </div>
                </div>
              </div>
              <div className="widgetComparator_content">
                <span>Qualité de l'air extérieur</span>
                <div className="widgetComparator_content_widget">
                  <div className="widgetComparator_content_widget_data bg-success">
                    <span className="widgetComparator_content_widget_data_span ">{aqi}</span>
                  </div>
                  <div className="widgetComparator_content_widget_content">
                    <span>Excellente qualité</span>
                    <div className="widgetComparator_content_widget_content_badge">
                      <div className="widgetComparator_content_widget_content_badge_single bg-success">
                        <FontAwesomeIcon icon="fa-solid fa-large fa-temperature-half" inverse/>
                      </div>
                      <div className="widgetComparator_content_widget_content_badge_single bg-success">
                        <FontAwesomeIcon icon="fa-solid fa-sun" inverse/>
                      </div>
                      <div className="widgetComparator_content_widget_content_badge_single bg-success">
                        <FontAwesomeIcon icon="fa-solid fa-droplet" inverse/>
                      </div>
                    </div>
                  </div>
                </div>
                {sensorCompare != null ?
                  <>
                    {sensorCompareConfig != null ?
                      <span>Qualité de l'air dans {sensorCompareConfig}</span>
                      : ""}
                    <div className="widgetComparator_content_widget">
                      <div className="widgetComparator_content_widget_data">
                        <span className="widgetComparator_content_widget_data_span">{Math.round(sensorCompare[2][2])}</span>
                      </div>
                      <div className="widgetComparator_content_widget_content">
                        <span>Qualitée de l'air{sensorCompare[2][2] > 33 ? " mauvaise" : sensorCompare[2][2] > 66 ? " moyenne" : " bonne"}</span>
                        <div className="widgetComparator_content_widget_content_badge">
                          <div className={sensorCompare[1]["temperature"] < 20 ? "bg-danger widgetComparator_content_widget_content_badge_single" : sensorCompare[1]["temperature"] > 30 ? "bg-warning widgetComparator_content_widget_content_badge_single" : "bg-success widgetComparator_content_widget_content_badge_single" }>
                            <FontAwesomeIcon icon="fa-solid fa-large fa-temperature-half" inverse title="Temperature"/>
                          </div>
                          <div className={sensorCompare[1]["light"] < 30 ? "bg-danger widgetComparator_content_widget_content_badge_single" : sensorCompare[1]["light"] > 60 ? "bg-warning widgetComparator_content_widget_content_badge_single" : "bg-success widgetComparator_content_widget_content_badge_single" }>
                            <FontAwesomeIcon icon="fa-solid fa-sun" inverse title={"Luminosité"}/>
                          </div>
                          <div className={sensorCompare[1]["humidity"] < 30 ? "bg-danger widgetComparator_content_widget_content_badge_single" : sensorCompare[1]["humidity"] > 60 ? "bg-warning widgetComparator_content_widget_content_badge_single" : "bg-success widgetComparator_content_widget_content_badge_single" }>
                            <FontAwesomeIcon icon="fa-solid fa-droplet" inverse title={"Humidité"}/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                  :
                  <div className="d-flex flex-row align-items-center justify-content-center mt-4">
                    <span className="text-secondary">Selectionnez un capteur</span>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard_layout_col">
          <div className="dashboard_box dashboard_box_small d-flex flex-column justify-content-between mb-4" style={{height: "28%"}}>
            <div className="d-flex flex-row ps-4 pe-4 pt-2 align-items-center justify-content-between">
              <span className="col-5">Météo</span>
              <div className="widgetComparator_head_select row col-7">
                <div className="d-flex flex-row justify-content-end">
                  <div>
                    <input type="text" className='form-control' id='weatherInput' value={citySearch} onChange={(e) => {setCitySearch(e.target.value)}}/>
                    {citys.length > 0 && citys[0].name != citySearch ?
                    <ul className="list-group position-absolute " style={{zIndex: 1000, cursor: "pointer"}}>
                      {citys.map(city =>
                        <li className="list-group-item pointer-event itemcustom" onClick={() => {setCitySearch(city.name); setCitys([])}}>{city.name} / {city.cp}</li>
                      )}
                    </ul>
                      : ''}
                  </div>
                  <button className="btn btn-primary ms-2" onClick={() => weatherCall()}><FontAwesomeIcon icon="fa-solid fa-search" inverse/></button>
                </div>
              </div>
            </div>
            {weather != null ?
              <div className="d-flex flex-row mb-3">
                <div className="widgetComparator_weather_img">
                  <img className="img-fluid" src={'/img/weather/'+ weather.weather[0].icon + '.svg'} alt=""/>
                </div>
                <div className=" d-flex flex-row justify-content-between widgetComparator_weather align-items-center">
                  <div className="d-flex flex-row">
                    <div className='d-flex flex-column'>
                      <div className="d-flex flex-column align-items-start">
                        <span className='widgetComparator_weather_temp'>{Math.round(parseFloat(weather.main.temp)-273.15) }°C</span>
                        <span className='widgetComparator_weather_text'>{weather.weather[0].main}</span>
                        <span className='widgetComparator_weather_tempfells'>Ressentit {Math.round((parseFloat(weather.main.temp))-273.15 )}°C</span>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex flex-column justify-content-between" style={{height :" 80%"}}>
                    <div className="d-flex flex-row align-items-center">
                      <div className="widgetComparator_weather_sun ms-2">
                        <img  src={'/img/weather/sunrise.png'} alt=""/>
                        {sunrise != null ?
                          <span>Estimé : {sunrise.getUTCHours()}h{sunrise.getUTCMinutes()}</span>
                          : ""}
                      </div>
                      <div className="widgetComparator_weather_sun me-2">
                        <img src={'/img/weather/sunset.png'} alt=""/>
                        {sunset != null ?
                          <span>Estimé : {sunset.getUTCHours()}h{sunset.getUTCMinutes()}</span>
                          : ""}
                      </div>
                    </div>
                    <div className="d-flex flex-row align-items-center justify-content-center">
                      <span className="widgetComparator_weather_badge text-light bg-primary me-2"><FontAwesomeIcon icon="fa-solid fa-droplet" inverse/> {weather.main.humidity} %</span>
                      <span className="widgetComparator_weather_badge text-light bg-primary me-2"><FontAwesomeIcon icon="fa-solid fa-wind" inverse/> {Math.round(parseFloat(weather.wind.speed) * 1.609344)} Km/H</span>
                      <span className="widgetComparator_weather_badge text-light bg-primary"><FontAwesomeIcon icon="fa-solid fa-cloud" inverse/> {weather.clouds.all} %</span>
                    </div>
                  </div>
                </div>
              </div>
            : ""}
          </div>
          <div className="dashboard_box dashboard_box_large pt-3 " style={{height: "70%"}}>
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

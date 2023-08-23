import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { fetchRoute } from '../../Utils/auth';
import  BadgeData  from '../../Components/BadgeData'
import  BadgeDataAdvanced  from '../../Components/BadgeDataAdvanced'
import  Chart  from '../../Components/LineChartSingle'
import { CircularProgress } from "@mui/material";
import { useParams } from 'react-router-dom';
import {getColor} from "../../Helpers/getColorHelper"

export default function SingleSensor() {
  const { id } = useParams();
  console.log(id)
  const [sensor, setSensor] = useState(null);
  const [data, setData] = useState(null);
  const [chart, setChart] = useState(null);
  const [message, setMessage] = useState(null);
  const [color, setColor] = useState(null);
  const [percent, setPercent] = useState(0);
  const [advanced, setAdvanced] = useState(false);
  const uid = useState(localStorage.getItem('userId'));
  const sensorComponent = []
  const token = localStorage.getItem('token');
  let [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0, visible: false, value: 0 });

  useEffect(() => {
    getSensor();
  }, []);

  useEffect(() => {
    if(sensor != null){
      fetchProbeDatas();
    }
  }, [sensor]);



  const fetchProbeDatas = async () => {
    const response = await fetchRoute('probe/', 'post', { address: sensor.address }, token);
    if(response != null){
      console.log(response)
      setData(response[1])
      setChart(response[0])
      setMessage(response[2])
      if(response[2][2] < 33 ){
        setColor("danger")
      } else if (response[2][2] < 66) {
        setColor("warning")
      } else {
        setColor("success")
      }
      setPercent(Math.round(response[2][2]))
      console.log(color , response[2][2])
    }
  };

  const getSensor = async () => {
    const response = await fetchRoute('sensor/find-one-by-id', 'post', { id: id }, token);
    if(response != null){
      setSensor(response)
      const params = JSON.parse(response.parameters)
      setAdvanced(params.advanced)
    }
  };

  let size = '350px';
  const style = {
    sizeBox: {
      height: size,
      width: size
    },
    circularBg: {
      backgroundColor: '#jFdksi'
    }
  };

  useEffect(() => {}, []);

  if (advanced == false) {
    sensorComponent.push(
      <>
        <div className="singlesensor__circular">
          <div className="circularprogress singlesensor__circular__circularprogress" style={style.sizeBox}>
            {color != null ?
              <CircularProgress variant="determinate"  style={{ color: '#F0F0F0' }} size={size} value={100} />
              : ""}
            {color != null ?
              <CircularProgress variant="determinate" color={color}  size={size} value={percent} />
              : ""}
            <div>
              <p className="singlesensor__circular__circularprogress__span">{percent}</p>
              <span>AQI</span>
              <span>Qualitée de l'air</span>
              {message != null ?
                <span className={"singlesensor__circular__circularprogress__span__qualityName text-" + color}>{message[1]}</span>
              : ""}
            </div>
          </div>
        </div>
        {data != null ?
          <div className="singlesensor__badges">
            <BadgeData icon="sun" color={getColor(Math.round(data["light"])*100/90)} data={Math.round(data["light"])}/>
            <BadgeData icon="temperature-quarter" color={getColor(Math.round(data["temperature"])*100/45)} data={Math.round(data["temperature"])}/>
            <BadgeData icon="percent" color={getColor(Math.round(data["humidity"])*100/90)} data={Math.round(data["humidity"])}/>
            <BadgeData icon="volume-high" color={getColor(Math.round(data["pressure"])*100/90)} data={Math.round(data["pressure"])}/>
            <BadgeData icon="wind" color="success" data={40}/>
          </div>
          : ""}
      </>
    )
  } else {
    sensorComponent.push(
      <div className="singlesensor_advanced">
        <div className="singlesensor__circular">
          <div className="circularprogress singlesensor__circular__circularprogress" style={style.sizeBox}>
            {color != null ?
              <CircularProgress variant="determinate"  style={{ color: '#F0F0F0' }} size={size} value={100} />
              :''}
              {color != null ?
              <CircularProgress variant="determinate" color={color}  size={size} value={percent} />
                :''}
            <div>
              <p className="singlesensor__circular__circularprogress__span">{percent}</p>
              <span>AQI</span>
              <span>Qualitée de l'air</span>
              {message != null ?
                <span className={"singlesensor__circular__circularprogress__span__qualityName text-" + color}>{message[1]}</span>
                : ""}
            </div>
          </div>
        </div>
        <div className="singlesensor_advanced__details">
          {data != null ?
          <div className="singlesensor__badges__advanced">
            <BadgeDataAdvanced type={"PM 1"} unite={"mg/2"} icon="cloud" percent={Math.round(data["particules0"])*100/90} color={getColor(Math.round(data["particules0"])*100/90)} data={Math.round(data["particules0"])}/>
            <BadgeDataAdvanced type={"PM 2.5"} unite={"mg/2"} icon="cloud" percent={Math.round(data["particules1"])*100/500} color={getColor(Math.round(data["particules1"])*100/500)} data={Math.round(data["particules1"])}/>
            <BadgeDataAdvanced type={"PM 10"} unite={"mg/2"} icon="cloud" percent={Math.round(data["particules2"])*100/600} color={getColor(Math.round(data["particules2"])*100/600)} data={Math.round(data["particules2"])}/>
            <BadgeDataAdvanced type={"CO2"} unite={"μg/m3"} icon="cloud" percent={Math.round(data["oxidised"])*100/50.4} color={getColor(Math.round(data["oxidised"])*100/50.4)} data={Math.round(data["oxidised"])}/>
            <BadgeDataAdvanced type={"NO2"} unite={"μg/m3"} icon="cloud" percent={Math.round(data["ammoniac"])*100/10} color={getColor(Math.round(data["ammoniac"])*100/10)} data={Math.round(data["ammoniac"])}/>
          </div>
            : ""}
          {data != null ?
            <div className="singlesensor__badges">
              <BadgeData icon="sun" color={getColor(Math.round(data["light"])*100/90)} data={Math.round(data["light"])}/>
              <BadgeData icon="temperature-quarter" color={getColor(Math.round(data["temperature"])*100/45)} data={Math.round(data["temperature"])}/>
              <BadgeData icon="percent" color={getColor(Math.round(data["humidity"])*100/90)} data={Math.round(data["humidity"])}/>
              <BadgeData icon="volume-high" color={getColor(Math.round(data["pressure"])*100/90)} data={Math.round(data["pressure"])}/>
              <BadgeData icon="wind" color="success" data={40}/>
            </div>
            : ""}
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="d-flex flex-row justify-content-end">
        <Link to="/sensors" className="btn btn-secondary">Retour</Link>
      </div>
      {sensor != null ?
        <div className="singlesensor">
          <div className="singlesensor__titles">
            <h1>{sensor.name}</h1>
            <span>
            Dans {sensor.Room.name}, {sensor.Room.Place.name}
          </span>
          </div>
          {sensorComponent}
          <div className="singlesensor__addons">
            <div className="singlesensor__addons__graph">
              {chart != null ?
                <Chart data={chart}/>
              : ""}
            </div>
            <div className="singlesensor__addons__advice">
              <h4>Conseil</h4>
              {message != null ?
              <p>
                {message[0]}
              </p>
                : ""}
            </div>
          </div>
        </div>
        : ''}
    </>
  );
}

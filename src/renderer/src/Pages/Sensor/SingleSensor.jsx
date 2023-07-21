import { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { fetchRoute } from '../../Utils/auth';
import { session } from 'electron';

export default function SingleSensor() {
  const location = useLocation();
  const { state } = location;
  sessionStorage.setItem('sensorId', state.datas.id)
  const [sensor, setSensor] = useState(state.datas);
  const [room, setRoom] = useState(state.datas.room);
  const [place, setPlace] = useState(state.datas.place);
  const uid = useState(localStorage.getItem('userId'));
  const token = useState(localStorage.getItem('token'));
  const [temperature, setTemperature] = useState(0.0);
  const [tempType, setTempType] = useState('');
  const [pressure, setPressure] = useState(0.0);
  const [humidity, setHumidity] = useState(0.0);
  const [light, setLight] = useState(0.0);
  const [reduced, setReduced] = useState(0.0);
  const [oxidised, setOxidised] = useState(0.0);
  const [ammoniac, setAmmoniac] = useState(0.0);
  const [particules0, setPart0] = useState(0.0);
  const [particules1, setPart1] = useState(0.0);
  const [particules2, setPart2] = useState(0.0);
  const [advice, setAdvice] = useState('')
  const [daily, setDaily] = useState([]);
  const [days, setDays] = useState([]);
  const [date, setDate] = useState('');
  const [chartDatas, setChartDatas] = useState({});
  const [config, setConfig] = useState({});
  const [labels, setLabels] = useState([]); // days labels
  const [isLoading, setIsLoading] = useState(true);
  let [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0, visible: false, value: 0 });

  useEffect(() => {
    fetchProbeDatas().then(() => setIsLoading(false));
    setChartDatas({
      labels: labels ? labels : '',
      datasets: [
        {
          label: 'My First Dataset',
          data: days ? days : [],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }
      ]
    });
    setConfig({
      type: 'line',
      data: chartDatas ? chartDatas : []
    });
  }, []);

  function getTemperatureFromParameters(data) {
    const parameters = JSON.parse(data.parameters);
    return parameters.temperature;
  }

  function getLastData(data) {
    let keys = Object.keys(data);
    let lastKey = keys.sort()[keys.length - 1];
    return {
      date: lastKey,
      aqi: data[lastKey]
    };
  }

  const fetchProbeDatas = async () => {
    console.log('url', sensor.address);
    const response = await fetchRoute('probe/', 'post', { address: sensor.address }, token);
    console.log(response);

    setTempType(getTemperatureFromParameters(state.datas));

    const responseData = response[1].length > 0 ? response[1][response[1].length - 1] : response[1];

    const { temperature, pressure, humidity, light, reduced, oxidised, ammoniac, particules0: part0, particules1: part1, particules2: part2 } = responseData;

    setTemperature(temperature);
    setPressure(pressure);
    setHumidity(humidity);
    setLight(light);
    setReduced(reduced);
    setOxidised(oxidised);
    setAmmoniac(ammoniac);
    setPart0(part0);
    setPart1(part1);
    setPart2(part2);

    setDaily(response[0]);
    setDays(response[1].length > 0 ? getPastSixDays : response[0]);
    setDate(response[1].length > 0 ? getCurrentDate : getLastData(response[0]));
    setAdvice(response[2]);

    let _labels = [];
    let past = getPastSixDays();
    for (let i = 0; i < past.length; i++) _labels.push(getDayOfWeek(past[i]));

    setLabels(_labels);
  };


  //   let color = getColor(percent);
  let size = '350px';
  const advanced = false;
  const style = {
    sizeBox: {
      height: size,
      width: size
    },
    circularBg: {
      backgroundColor: '#jFdksi'
    }
  };

  useEffect(() => { }, []);

  // if (advanced == false) {

  //   sensor.push(
  //     <>
  //       <div className="singlesensor__circular">
  //         <div
  //           className="circularprogress singlesensor__circular__circularprogress"
  //           style={style.sizeBox}
  //         >
  //           {/* <CircularProgress
  //             variant="determinate"
  //             style={{ color: '#F0F0F0' }}
  //             size={size}
  //             value={100}
  //           />
  //           <CircularProgress variant="determinate" color={color} size={size} value={percent} /> */}
  //           <div>
  //             <p className="singlesensor__circular__circularprogress__span">{percent}</p>
  //             <span>AQI</span>
  //             <span>Qualitée de l'air</span>
  //             {/* <span
  //               className={
  //                 'singlesensor__circular__circularprogress__span__qualityName text-' + color
  //               }
  //             >
  //               Mauvaise
  //             </span> */}
  //           </div>
  //         </div>
  //       </div>
  //       <div className="singlesensor__badges">
  //         {/* <BadgeData icon="sun" color="danger" data={80} />
  //         <BadgeData icon="temperature-quarter" color="success" data={70} />
  //         <BadgeData icon="percent" color="info" data={60} />
  //         <BadgeData icon="volume-high" color="info" data={60} />
  //         <BadgeData icon="wind" color="success" data={100} /> */}
  //       </div>
  //     </>
  //   );
  // } else {
  //   sensor.push(
  //     <div className="singlesensor_advanced">
  //       <div className="singlesensor__circular">
  //         <div
  //           className="circularprogress singlesensor__circular__circularprogress"
  //           style={style.sizeBox}
  //         >
  //           {/* <CircularProgress
  //             variant="determinate"
  //             style={{ color: '#F0F0F0' }}
  //             size={size}
  //             value={100}
  //           /> */}
  //           {/* <CircularProgress variant="determinate" color={color} size={size} value={percent} /> */}
  //           <div>
  //             <p className="singlesensor__circular__circularprogress__span">{percent}</p>
  //             <span>AQI</span>
  //             <span>Qualitée de l'air</span>
  //             <span
  //               className={
  //                 'singlesensor__circular__circularprogress__span__qualityName text-' + color
  //               }
  //             >
  //               Mauvaise
  //             </span>
  //           </div>
  //         </div>
  //       </div>
  //       <div className="singlesensor_advanced__details">
  //         <div className="singlesensor__badges__advanced">
  //           {/* <BadgeDataAdvanced icon="cloud" color="success" data={80} />
  //           <BadgeDataAdvanced icon="cloud" color="success" data={86} />
  //           <BadgeDataAdvanced icon="cloud" color="success" data={100} />
  //           <BadgeDataAdvanced icon="cloud" color="info" data={60} />
  //           <BadgeDataAdvanced icon="cloud" color="danger" data={10} /> */}
  //         </div>
  //         <div className="singlesensor__badges">
  //           {/* <BadgeData icon="sun" color="danger" data={80} />
  //           <BadgeData icon="temperature-quarter" color="success" data={70} />
  //           <BadgeData icon="percent" color="info" data={60} />
  //           <BadgeData icon="volume-high" color="info" data={60} />
  //           <BadgeData icon="wind" color="success" data={100} /> */}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
  // const { id } = useParams();
  // console.log(id);

  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10) {
      month = '0' + month;
    }
    const day = date.getDate();
    return `${day}/${month}/${year}`;
  };

  const getDayOfWeek = (date) => {
    const daysOfWeek = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const dayOfWeek = daysOfWeek[new Date(date.split('/').reverse().join('-')).getDay()];
    return dayOfWeek;
  };

  const getPastSixDays = () => {
    const dates = [];
    for (let i = 0; i < 6; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const year = date.getFullYear();

      let month = date.getMonth() + 1;
      if (month < 10) {
        month = '0' + month;
      }

      let day = date.getDate();
      if (day < 10) {
        day = '0' + day;
      }
      dates.push(`${day}/${month}/${year}`);
    }
    return dates;
  };

  return (
    <>
      <NavLink to="/">Retour</NavLink>
      <div className="singlesensor">
        <div className="singlesensor__titles">
          <h1>{sensor.name}</h1>
          <span>
            Dans {room.name}, {place.name}
          </span>
        </div>
        <div className="singlesensor__addons">
          <div className="singlesensor__datas">
            <p>
              Température : {temperature}° {tempType}
            </p>
            <p>Humidité {humidity}:</p>
            <p>Pression: {pressure}</p>
            <p>Luminosité : {light}</p>
          </div>
          <div className="singlesensor__addons__graph">
            <p>{date.date} : {date.aqi}%</p>
          </div>
          <div className="singlesensor__addons__advice">
            <h4>Conseil</h4>
            <span>Qualité de l'air: {advice[1]}</span>
            <p>
              {advice[0]}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

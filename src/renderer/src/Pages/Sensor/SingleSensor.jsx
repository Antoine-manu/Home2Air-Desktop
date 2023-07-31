import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { fetchRoute } from '../../Utils/auth';

export default function SingleSensor({props}) {
  console.log("ICIIIII" +  props)
  const [sensor, setSensor] = useState("");
  const [room, setRoom] = useState("");
  const [place, setPlace] = useState("Ò");
  const uid = useState(localStorage.getItem('userId'));
  const token = useState(localStorage.getItem('token'));
  const [temperature, setTemperature] = useState(0.0);
  const [pressure, setPressure] = useState(0.0);
  const [humidity, setHumidity] = useState(0.0);
  const [light, setLight] = useState(0.0);
  const [reduced, setReduced] = useState(0.0);
  const [oxidised, setOxidised] = useState(0.0);
  const [ammoniac, setAmmoniac] = useState(0.0);
  const [particules0, setPart0] = useState(0.0);
  const [particules1, setPart1] = useState(0.0);
  const [particules2, setPart2] = useState(0.0);
  const [daily, setDaily] = useState([]);
  const [days, setDays] = useState([]);
  const [date, setDate] = useState('');
  const [labels, setLabels] = useState([]); // days labels
  const [isLoading, setIsLoading] = useState(true);
  let [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0, visible: false, value: 0 });
  useEffect(() => {
    fetchProbeDatas().then(() => setIsLoading(false));
    // setIsLoading(false)
  }, []);

  const fetchProbeDatas = async () => {
    console.log('url', sensor.address);
    const response = await fetchRoute('probe/', 'post', { address: sensor.address }, token);
    console.log(response.data);
    //La dernière data de stream, le 3ème élément du tableau response
    // setTemperature(response[1][response[1].length - 1].temperature);
    // setPressure(response[1][response[1].length - 1].pressure);
    // setHumidity(response[1][response[1].length - 1].humidity);
    // setLight(response[1][response[1].length - 1].light);
    // setReduced(response[1][response[1].length - 1].reduced);
    // setOxidised(response[1][response[1].length - 1].oxidised);
    // setAmmoniac(response[1][response[1].length - 1].ammoniac);
    // setPart0(response[1][response[1].length - 1].particules0);
    // setPart1(response[1][response[1].length - 1].particules1);
    // setPart2(response[1][response[1].length - 1].particules2);
    setDaily(response[0]);
    setDate(getCurrentDate);
    setDays(getPastSixDays);
    let _labels = [];
    let past = getPastSixDays();
    for (let i = 0; i < past.length; i++) {
      _labels.push(getDayOfWeek(past[i]));
    }
    setLabels(_labels);
  };

  /*console.log(state.datas);*/

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

  useEffect(() => {}, []);

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

  return (
    <>
      <Link to="/">Retour</Link>
      <div className="singlesensor">
        <div className="singlesensor__titles">
          <h1>{sensor.name}</h1>
          <span>
            Dans {room.name}, {place.name}
          </span>
        </div>
        <div className="singlesensor__addons">
          <div className="singlesensor__addons__graph"></div>
          <div className="singlesensor__addons__advice">
            <h4>Conseil</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit in debitis
              beatae, modi adipisci, doloribus quae ipsa eum magnam, amet facere recusandae eaque
              corrupti est dignissimos atque inventore odit vero!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

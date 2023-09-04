import React, { useState, useEffect } from 'react';
import axios from 'axios';
function Weather() {
  const [weatherData, setWeatherData] = useState({});
  const apiKey = '398b5113c4e291ebc507086d4239f018';
  const city = 'Amiens';

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      )
      .then((response) => {
        console.log(reponse)
        setWeatherData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [city, apiKey]);

  return (
    <></>
  );
}

export default Weather;

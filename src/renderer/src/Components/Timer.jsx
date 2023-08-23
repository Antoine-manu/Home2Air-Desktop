import React, { useState, useEffect } from 'react';

function Timer() {
  const [updateTime, setUpdateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setUpdateTime(new Date());
    }, 60000); // Met à jour le temps toutes les 60 secondes (1 minute)

    return () => clearInterval(intervalId);
  }, []);

  const getTimeDifference = () => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - updateTime) / 60000);
    return diffInMinutes;
  };

  return (
    <span className="widgetMain_mid_undertext text-secondary">Mis à jour il y a {getTimeDifference()} minutes</span>
  );
}

export default Timer;

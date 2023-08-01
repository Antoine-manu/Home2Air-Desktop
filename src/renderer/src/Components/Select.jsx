import React from 'react';
import Select from 'react-select';

const MySelect = (props) => {

  let options = [];
  let _default = null

  props.rooms.map(room => {
    if(room.Sensor.length > 0){
      let sensors = []
      room.Sensor.map(sensor => {
        let content = {
          value : sensor.id,
          label : sensor.name
        }
        sensors.push(content)
      })
      let roomSelect = {
        label : room.name,
        options : sensors
      }
      options.push(roomSelect)
    }
  })

  return (
    <Select
      options={options}
      noOptionsMessage={() => "Ajoutez un capteur pour qu'il apparaisse ici"}
      placeholder={"Selectionnez un capteur"}
    />
  );
};

export default MySelect;

// import Captor from '../../Components/SmallCaptor';

export default function Home({ data }) {
  //   let places = data.place;

  let content = [];

  //   places.forEach((place) => {
  //     //Create the place's div
  //     let divContent = [];
  //     //Global percent for color display
  //     let globalPercents = 0;
  //     let sensors = place.sensors;

  //     //Add every sensor to the place
  //     sensors.forEach((sensor) => {
  //       divContent.push(<Captor datas={sensor} />);
  //       globalPercents += sensor.percent;
  //     });

  //     //Give percent
  //     let status = globalPercents / sensors.length;
  //     let color = '';

  //     //Set color compared to status
  //     if (status < 60) {
  //       color = 'danger';
  //     } else if (status >= 60 && status < 80) {
  //       color = 'info';
  //     } else if (status >= 80) {
  //       color = 'success';
  //     }

  //     content.push(
  //       <h3 className="mt-4">
  //         {place.name} <div className={'pastille ' + color}></div>
  //       </h3>
  //     );
  //     content.push(<div>{divContent}</div>);
  //   });

  const disconnect = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  };

  

  return (
    <>
      <div className="home">
        <h1>Accueil</h1>
        <button
          onClick={() => {
            disconnect;
          }}
        >
          Se déconnecter
        </button>
      </div>
    </>
  );
}


export default function EditSensor(props) {

  const sensor = props.sensor;
  console.log(sensor)
  return(
    <>
      <div className="modal fade modal-xl" id={"edit" + sensor.id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Modifier le capteur {sensor.name}</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <h3>Informations</h3>
              <div className="row">
                <div className="col-12 mt-2 form-group">
                  <label htmlFor="name">Nom</label>
                  <input type="text" className="form-control" id="name" defaultValue={sensor.name}/>
                </div>
                <div className="col-12 mt-2 form-group">
                  <label htmlFor="room">Pièce</label>
                  <select type="email" className="form-select" id="room" defaultValue={sensor.room}>
                    <option defaultValue="1">Salon</option>
                    <option defaultValue="2">Chambre</option>
                  </select>
                </div>
              </div>
              <hr className="mt-4"/>
              <h3 className="mt-3">Parametres generaux</h3>
              <div className="col-12 mt-2 form-group">
                <label htmlFor="degres">Température</label>
                <select type="email" className="form-select" id="degres">
                  <option defaultValue="1">Celcus</option>
                </select>
              </div>
              <div className="form-check form-switch mt-2">
                <input className="form-check-input" type="checkbox" role="switch" id="advanced"/>
                <label className="form-check-label" htmlFor="advanced">Parametres avancés</label>
              </div>
              <hr className="mt-4"/>
              <h3 className="mt-3">Notifications</h3>
              <div className="col-12 mt-2 form-group">
                <label htmlFor="degres">Température</label>
                <select type="email" className="form-select" id="degres">
                  <option defaultValue="1">Celcus</option>
                </select>
              </div>
              <a href="link mt-3">Gerer les notifications personnalisées</a>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary">Supprimer</button>
              <button type="button" className="btn btn-primary">Mettre a jour</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

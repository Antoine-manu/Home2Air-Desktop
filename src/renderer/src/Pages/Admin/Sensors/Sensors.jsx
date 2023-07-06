export default function AdminSensors() {


    return(
        <>
            <div className="d-flex flex-row justify-content-between">
                <h1>Capteurs</h1>
                <a href="#" className="btn btn-primary">Créer un Capteur</a>
            </div>
            <div className="datatable mt-4">
                <div className="d-flex flex-row datatable_top justify-content-between">
                    <input className="form-control" type="text" placeholder="Rechercher un capteur"/>
                    <div className="d-flex flex-row">
                        <span>Filtrer par :</span>
                        <select name="" id="" className="form-control">
                            <option value="" selected>Id</option>
                        </select>
                    </div>
                </div>
                <div className="datatable_table">
                <table class="table mt-4">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Nom</th>
                            <th scope="col">Créer par</th>
                            <th scope="col">Date de création</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row" className="">#1233</th>
                            <td>Capteur salon</td>
                            <td>Antoine</td>
                            <td>06/02/2023</td>
                            <td><a className="btn btn-secondary">Voir plus</a></td>
                        </tr>
                    </tbody>
                </table>
                </div>
            </div>
        </>
    )   
}
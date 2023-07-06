export default function Tickets() {


    return(
        <>
            <div className="d-flex flex-row justify-content-between">
                <h1>Tickets</h1>
                <a href="#" className="btn btn-primary">Créer un Ticket</a>
            </div>
            <div className="datatable mt-4">
                <div className="d-flex flex-row datatable_top justify-content-between">
                    <input className="form-control" type="text" placeholder="Rechercher un ticket"/>
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
                            <th scope="col">Titre</th>
                            <th scope="col">Participant</th>
                            <th scope="col">Status</th>
                            <th scope="col">Date de création</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row" className="">#1233</th>
                            <td>Probleme sur le capteur BE402</td>
                            <td>Antoine</td>
                            <td>Ouvert</td>
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
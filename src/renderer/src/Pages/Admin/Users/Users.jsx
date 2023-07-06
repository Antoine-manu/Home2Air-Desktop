export default function AdminUsers() {


    return(
        <>
            <div className="d-flex flex-row justify-content-between">
                <h1>Utilisateurs</h1>
                <a href="#" className="btn btn-primary">Créer un utilsateur</a>
            </div>
            <div className="datatable mt-4">
                <div className="d-flex flex-row datatable_top justify-content-between">
                    <input className="form-control" type="text" placeholder="Rechercher un utilisateur"/>
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
                            <th scope="col"><input class="form-check-input" type="checkbox" value=""/></th>
                            <th scope="col">Nom</th>
                            <th scope="col">Prénom</th>
                            <th scope="col">Email</th>
                            <th scope="col">Nombre de capteurs</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row"><input class="form-check-input" type="checkbox" value=""/></th>
                            <td>Gaudry</td>
                            <td>Antoine</td>
                            <td>Antoine.gaudry60@gmail.com</td>
                            <td>6</td>
                        </tr>
                    </tbody>
                </table>
                </div>
            </div>
        </>
    )   
}
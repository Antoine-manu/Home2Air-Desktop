import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function badgeData(props) {

    let color = props.color
    let data = props.data
    let icon = props.icon

    return(
        <>
            <div className={"badgeData text-"+color}>
                <FontAwesomeIcon icon={"fa-solid fa-" + icon}/>
                <span>{data}</span>
            </div>
        </>
    )   
}
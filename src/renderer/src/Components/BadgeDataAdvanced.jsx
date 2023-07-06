import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function badgeDataAdvanced(props) {

    let color = props.color
    let data = props.data
    let icon = props.icon
    console.log(data, color)
    const style = {
        activeBar : {
            height : data + "%",
            backgroundColor : color 
        }
    }

    return(
        <>
            <div className={"badgeDataAdvanced"}>
                <div className='badgeDataAdvanced__icon'>
                    <FontAwesomeIcon icon={"fa-solid fa-" + icon}/>
                    <span>PM 1</span>
                </div>
                <div className='badgeDataAdvanced__bars'>
                    <div className='badgeDataAdvanced__bars__bg'></div>
                    <div className={'badgeDataAdvanced__bars__active bg-' + color} style={style.activeBar}></div>
                </div>
                <div className="badgeDataAdvanced__datas">
                    <span className={"badgeDataAdvanced__datas__data text-"+color}>{data}</span>
                    <span className='badgeDataAdvanced__datas__subtile'>mg/2</span>
                </div>
            </div>
        </>
    )   
}
import { CircularProgress } from "@mui/material"
import {getColor} from "../Helpers/getColorHelper"

export default function circularProgress({percent}) {
    
    let color = getColor(percent)

    return(
        <>
            <div className="circularprogress">
                <CircularProgress variant="determinate" style={{ color: '#F0F0F0' }} size='70px' value={100} />
                <CircularProgress variant="determinate" color={color}  size='70px' value={percent} />
                <div>
                    <p>{percent}</p>
                    <span>AQI</span>
                </div>
            </div>
        </>
    )   
}
import Circular from './CircularProgress'
import { Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom';

export default function SmallCaptor({datas}) {
    console.log(datas)
    
    return (
        <>
            <div className='captorcard'>
                <div className='captorcard__left'>
                    <Circular percent={datas.percent}/>
                </div>
                <div className='captorcard__right'>
                    <div className='captorcard__right__titles'>
                        <p className='captorcard__right__titles__title'>Title</p>
                        <p><FontAwesomeIcon icon="fa-solid fa-gear"/></p>
                    </div>
                    <div className='captorcard__right__button'>
                        <NavLink to={'/sensor/' + datas.id} className='btn btn-primary'>Voir</NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}
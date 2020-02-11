import React from 'react'
import { Marker } from 'react-map-gl'
import GetInitials from './GetInitials'
import './Markers.css'

const Markers = React.memo(({ projects, handleClick, handleHover, query = ['Led', 'Partnership', 'Collaboration'], hover, active }) => {
    let size = 30
    

    return projects.map(p => {
        if (query.includes(p.Type)) {

                const line = p.angle && p.offset ? (
                    <svg style={ {transform : `rotate(${-p.angle}rad) translateX(${p.offset / 2}px)` }} width={p.offset} height='2'>  
                        <line x1='0' y1='1' x2={p.offset} y2='1'/>
                    </svg>
                ) : null


            return <Marker key={p.Name} longitude={p.Lng} latitude={p.Lat} offsetLeft={p.x - size / 2} offsetTop={p.y - size / 2}>
                <div onClick={() => active === p ? handleClick(null) : handleClick(p)}
                    onMouseEnter={() => handleHover(p)}
                    onMouseLeave={() => handleHover(null)}
                    className={`ivr-marker ivr-${p.Type} ivr-${p.Icon} ${hover === p || active === p ? 'ivr-marker-active' : ''}`}
                >
                    {line}
                    <div className={`ivr-mark ${active === p ? 'ivr-mark-selected' : ''}`} />
                    <div className='ivr-mark-label-wrap'>
                    <div className='ivr-mark-label ivr-mark-stroke'>{hover === p || active === p ? p.Name : GetInitials(p.Name, 8, false)}</div>
                        <div className='ivr-mark-label'>{hover === p || active === p ? p.Name : GetInitials(p.Name, 8, false)}</div>
                    </div>

                </div>
            </Marker>
        }
        return null
    })

})

export default Markers
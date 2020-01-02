import React from 'react'
import { Marker } from 'react-map-gl'
import getInitials from './GetInitials'
import './Markers.css'

const Markers = React.memo(({ projects, handleClick, handleHover, query = ['Led', 'Collaboration', 'Inspired'], hover, active }) => {
    let size = 30
    return projects.map(p => {
        if (query.includes(p.Type)) {

            return <Marker key={p.Name} longitude={p.Lng} latitude={p.Lat} offsetLeft={p.x - size / 2} offsetTop={p.y - size / 2}>
                <div onClick={() => active === p ? handleClick(null) : handleClick(p)}
                    onMouseEnter={() => handleHover(p)}
                    onMouseLeave={() => handleHover(null)}
                    className={`ivr-marker ivr-${p.Type} ${hover === p || active === p ? 'ivr-marker-active' : ''}`}
                >
                    <div className={`ivr-mark ${active === p ? 'ivr-mark-selected' : ''}`} />

                    <div className='ivr-mark-label-wrap'>
                    <div className='ivr-mark-label ivr-mark-stroke'>{hover === p || active === p ? p.Name : getInitials(p.Name, 8, false)}</div>
                        <div className='ivr-mark-label'>{hover === p || active === p ? p.Name : getInitials(p.Name, 8, false)}</div>
                    </div>

                </div>
            </Marker>
        }
    })

})

export default Markers
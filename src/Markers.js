import React from 'react'
import { Marker } from 'react-map-gl'

const Markers = React.memo(({ projects, callback, query = ['Led', 'Collaboration', 'Inspired'], size = 30 }) => {
    
    return projects.map(p => {
        if (query.includes(p.Type)) {

            let handleClick = () => {
                callback(p)
            }
        
            return <Marker key={p.Name} longitude={p.Lng} latitude={p.Lat} offsetLeft={p.x} offsetTop={p.y}>
                <div onClick={handleClick}
                    style={{
                        width: size,
                        height: size,
                        borderRadius: '50%',
                        backgroundColor: '#fff',
                        boxShadow:'0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
                    }}>{p.Name}</div>
            </Marker>
        }
    })

})

export default Markers
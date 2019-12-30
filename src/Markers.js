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
                        backgroundColor: '#fff'
                    }}>{p.Name}</div>
            </Marker>
        }
    })

})

export default Markers
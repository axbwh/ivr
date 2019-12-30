import mapboxgl from 'mapbox-gl'
import _ from 'lodash'

let markerSize = 30

const withinDist = (a, b, dist) => {
    return Math.hypot(a.x - b.x, a.y - b.y) <= dist
}

const getCentroid = (arr) => {
    let bounds = new mapboxgl.LngLatBounds();

    arr.forEach(pos => {
        bounds.extend(pos)
    })

    return bounds.getCenter()
}

const circleRadius = (arr, nodesize = 30, padding = 25) => {
    let circum = arr.length * nodesize + arr.length * padding
    let radius = circum / (2 * Math.PI)
    return radius > nodesize ? radius : nodesize
}

const orderNodes = (projects, map) => {
    projects.forEach((p, i) => {
        p.x = 0
        p.y = 0
        p.Lat = p.sLat
        p.Lng = p.sLng
    })

    let groupDist = markerSize * 2

    //get latlng of each marker, project it to a px based xy, and map those value to an array
    let allPos = projects.map(p => map.project([p.Lng, p.Lat]))
    
    //remove pos within distance of another from array
    let somePos = _.uniqWith(allPos, (a, b) => withinDist(a, b, groupDist))

    //group markers based on distance to somepos
    let groupPos = []
    let tempProjects = [...projects]

    somePos.forEach(pos => {
        groupPos.push(_.remove(tempProjects, p => withinDist(map.project([p.Lng, p.Lat]), pos, groupDist)))
    })

    // arrange grouped nodes in circle around group center
    groupPos.forEach(g => {
        let groupCenter = getCentroid(g.map(p => [p.Lng, p.Lat]))

        let radius = circleRadius(g, 30, 25)
        console.log(groupCenter)

        g.forEach((p, i) => {
            p.Lng = groupCenter.lng
            p.Lat = groupCenter.lat

            if (g.length > 1) {
                let angle = Math.PI * 2 / g.length * i

                p.x = Math.sin(angle) * radius
                p.y = Math.cos(angle) * radius
            }
        })

    })
}

export default orderNodes
import mapboxgl from 'mapbox-gl'
import _ from 'lodash'

let markerSize = 35
let TWOPI = Math.PI * 2 

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

const circle = (arr, center, nodesize = 35, padding = 25) => {
    let circum = arr.length * nodesize + arr.length * padding
    let radius = circum / TWOPI

    radius = radius > nodesize ? radius : nodesize

    arr.forEach((p, i) => {
        p.Lng = center.lng
        p.Lat = center.lat

        if (arr.length > 1) {
            let angle = TWOPI / arr.length * i

            p.x = Math.sin(angle) * radius
            p.y = Math.cos(angle) * radius
            p.angle = - angle - ( Math.PI / 2) 
            p.offset = radius


        }
    })
}

function spiral(arr, center) {

    const options = {
        lengthStart : 30,
        footSeparation: 30,
        lengthFactor: 1.75
    }
    
    var legLength = options.lengthStart,
      angle = 0;

    arr.forEach((p, i) => {
        p.Lng = center.lng
        p.Lat = center.lat

      angle = angle + (options.footSeparation / legLength + i * 0.0005);

      p.x = legLength * Math.sin(angle)
      p.y = legLength * Math.cos(angle)

      if(i === 0){
        p.angle = - angle - Math.PI / 2
        p.offset = legLength
      }else{
        p.angle = Math.atan2(arr[i-1].y - p.y, arr[i-1].x - p.x)
        p.offset = Math.hypot(arr[i-1].x - p.x, arr[i-1].y - p.y) - 12
      }

      legLength = legLength +  (TWOPI * options.lengthFactor / angle)

    })

  }

const orderNodes = (projects, map, query) => {

    projects.forEach((p, i) => {
        p.x = 0
        p.y = 0
        p.offset = 0
        p.angle = 0
        p.Lat = p.sLat
        p.Lng = p.sLng
    })
    //filter out nodes not in type query (array of checked project types)
    projects = projects.filter(p => query.includes(p.Type))

    let groupDist = markerSize * 2.5

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

        if(g.length > 6){
            spiral(g, groupCenter)
        }else{
            circle(g, groupCenter)
        }
    })
}

export default orderNodes
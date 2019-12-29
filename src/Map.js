import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl'
import _ from 'lodash'

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

class Map extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lng: 5,
            lat: 34,
            zoom: {
                min: 1.5,
                max: 6
            }
        }
        this.projects = this.props.projects
        this.addNodes = this.addNodes.bind(this)
        this.orderNodes = this.orderNodes.bind(this)
        this.resetNodes = this.resetNodes.bind(this)
    }

    filterNodes(query) {
        //filter nodes based on query
    }

    resetNodes(){
        this.projects.forEach(p => p.marker.setOffset([0,0]).setLngLat([p.Lng, p.Lat]))
    }

    orderNodes() {
        this.resetNodes();
        let markerSize = 30
        let groupDist = markerSize*2

        //get latlng of each marker, project it to a px based xy, and map those value to an array
        let allPos = this.projects.map(p => this.map.project(p.marker.getLngLat()))
        //remove pos within distance of another from array
        let somePos = _.uniqWith(allPos, (a, b) => withinDist(a, b, groupDist))

        //group markers based on distance to somepos
        let groupPos = []
        let projects = [...this.projects]

        somePos.forEach(pos => {
            groupPos.push(_.remove(projects, p => withinDist(this.map.project(p.marker.getLngLat()), pos, groupDist)))
        })

        // arrange grouped nodes in circle around group center
        groupPos.forEach(g => {
            let groupCenter = getCentroid(g.map(p => p.marker._lngLat))
            
            let radius = circleRadius(g, 30, 25)
            console.log(groupCenter)

            g.forEach((p, i) => {
                p.marker.setLngLat(groupCenter)
                if (g.length > 1) {
                    let angle = Math.PI * 2 / g.length * i

                    let x = Math.sin(angle) * radius
                    let y = Math.cos(angle) * radius
                    p.marker.setOffset([x, y])
                }
            })

        })
    }

    addNodes() {
        this.projects.forEach(p => {
            let option = { element: <div>marker</div>}
            p.marker = new mapboxgl.Marker().setLngLat([p.Lng, p.Lat]).addTo(this.map);
        });

        this.orderNodes()
    }

    componentDidMount() {
        this.map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/axbwh/ck4n9ufn50bor1cp62o1oa5yp',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom.min,
            minZoom: this.state.zoom.min,
            maxZoom: this.state.zoom.max,
            pitchWithRotate: false,
            dragRotate: false
        });

        this.map.on('load', this.addNodes);
        this.map.on('zoomend', this.orderNodes)
    }

    render() {

        return (
            <div>
                <div ref={el => this.mapContainer = el} style={{ width: '100vw', height: '100vh' }} className='ivr-map-wrap' />
            </div>
        )
    }
}

export default Map
import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl'
import ReactMapGL, { Marker, HTMLOverlay } from 'react-map-gl'
import _ from 'lodash'
import './Map.css'

const TOKEN = 'pk.eyJ1IjoiYXhid2giLCJhIjoiY2s0bmpmZWlrMzNqYTNubmFhdzRpcWpwciJ9.suGRP9vc9Hv2POzpHBQ3-g'

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

let markerSize = 30

const Markers = React.memo(({ projects }) => {

    return projects.map(p =>
        <Marker key={p.Name} longitude={p.Lng} latitude={p.Lat} offsetLeft={p.x} offsetTop={p.y}>
            <div style={{
                width : markerSize,
                height: markerSize,
                borderRadius: '50%',
                backgroundColor: '#fff'
            }}>{p.Name}</div>
        </Marker>)

})

class Map extends Component {

    constructor(props) {
        super(props)
        this.state = {
            viewport: {
                width: "100%",
                height: "100vh",
                longitude: 5,
                latitude: 34,
                zoom: 1.5,
                minZoom: 1.5,
                maxZoom: 3.5,
            },
            activeNode: null,
            projects: this.props.projects
        }

        this.addNodes = this.addNodes.bind(this)
        this.orderNodes = this.orderNodes.bind(this)
        this.resetNodes = this.resetNodes.bind(this)
        this._redraw = this._redraw.bind(this)
    }

    _updateViewport = viewport => {
        this.setState({ viewport });
    }

    _redraw = ({width, height, ctx, isDragging, project, unproject}) => {
        this.project = project
    }


    filterNodes(query) {
        //filter nodes based on query
    }

    resetNodes() {
        this.state.projects.forEach( (p, i) => { 
            p.x = 0
            p.y = 0 
            p.Lat = this.props.projects[i].Lat
            p.Lng = this.props.projects[i].Lng
        })
    }

    orderNodes() {
        this.resetNodes();

        let groupDist = markerSize * 2

        //get latlng of each marker, project it to a px based xy, and map those value to an array
        let allPos = this.state.projects.map(p => this.project([p.Lng, p.Lat]))
        //remove pos within distance of another from array
        let somePos = _.uniqWith(allPos, (a, b) => withinDist(a, b, groupDist))

        //group markers based on distance to somepos
        let groupPos = []
        let projects = [...this.state.projects]

        somePos.forEach(pos => {
            groupPos.push(_.remove(projects, p => withinDist(this.project([p.Lng, p.Lat]), pos, groupDist)))
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
        this.state.projects.forEach(p => {
            p.marker = new mapboxgl.Marker().setLngLat([p.Lng, p.Lat]).addTo(this.map);
        });

        this.orderNodes()
    }

    render() {
        const { viewport } = this.state
        return (
            <ReactMapGL
                {...viewport}
                mapStyle="mapbox://styles/axbwh/ck4n9ufn50bor1cp62o1oa5yp"
                onViewportChange={this._updateViewport}
                onZoomEnd={this.resetNodes}
                dragRotate={false}
                mapboxApiAccessToken={TOKEN}
                ref={map => this.map = map}
            >
                <Markers projects={this.state.projects} />
            </ReactMapGL>
        )
    }
}

export default Map
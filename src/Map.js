import React, { Component } from 'react'
import ReactMapGL from 'react-map-gl'
import './Map.css'

import {TOKEN} from './Data'
import  OrderNodes  from './MapUtils'
import Markers from './Markers'


class Map extends Component {
    mapRef = React.createRef()

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
                maxZoom: 3,
            },
            activeNode: null,
            projects: this.props.projects
        }
        this.orderNodes = this.orderNodes.bind(this)
    }

    _updateViewport = viewport => {
        this.setState({ viewport });
    }

    orderNodes(){
        OrderNodes(this.state.projects, this.map)
    }

    componentDidMount() {
        this.map = this.mapRef.current.getMap()
        this.map.on('zoomend', this.orderNodes)
        this.orderNodes()
    }

    render() {
        const { viewport } = this.state
        return (
            <ReactMapGL
                {...viewport}
                mapStyle="mapbox://styles/axbwh/ck4n9ufn50bor1cp62o1oa5yp"
                onViewportChange={this._updateViewport}
                dragRotate={false}
                mapboxApiAccessToken={TOKEN}
                ref={this.mapRef}
            >
                <Markers projects={this.state.projects} callback={this.props.callback} query={['Led', 'Collaboration', 'Inspired']} />
            </ReactMapGL>
        )
    }
}

export default Map
import React, { Component } from 'react'
import ReactMapGL, {LinearInterpolator, FlyToInterpolator} from 'react-map-gl'
import {easeCubic} from 'd3-ease';
import Nav from './Nav'
import './Map.css'

import { TOKEN } from './Data'
import OrderNodes from './MapUtils'
import Markers from './Markers'
import Search from './Search'
import Brand from './Brand'
import About from './About'

class Map extends Component {
  mapRef = React.createRef()

  constructor(props) {
    super(props)
    this.state = {
      viewport: {
        longitude: 5,
        latitude: 34,
        zoom: 1.5,
        minZoom: 1,
        maxZoom: 6
      },
      activeNode: null,
      projects: this.props.projects,
      query: ['Led', 'Partnership', 'Collaboration'],
      node: null,
      hover: null,
      isAbout: false
    }

    this.orderNodes = this.orderNodes.bind(this)
    this.filterNodes = this.filterNodes.bind(this)
    this.getFocusNode = this.getFocusNode.bind(this)
    this.getHoverNode = this.getHoverNode.bind(this)
    this._updateViewport = this._updateViewport.bind(this)
  }

  _updateViewport = viewport => {
    this.setState({ viewport })
  }

  orderNodes(callback) {
    this.setState(prevState => {
      let newProjects = [...prevState.projects]

      OrderNodes(newProjects, this.map, this.state.query)

      return { projects: newProjects }
    })
  }

  filterNodes(query) {
    this.setState({ query: query }, this.orderNodes)
  }

  getFocusNode = node => {
    if (node) {
      const viewport = {
        ...this.state.viewport,
        longitude: node.Lng,
        latitude: node.Lat,
        transitionDuration: 'auto',
        transitionInterpolator: new FlyToInterpolator({ screenSpeed: 1 }),
        transitionEasing: easeCubic
      }

      this.setState({
        viewport: viewport
      })
    }

    this.setState({
      node: node
    })
  }

  getHoverNode = node => {
    this.setState({ hover: node })
  }

  getAbout = boolean => {
    this.setState({ isAbout: boolean })
  }

  componentDidMount() {
    this.map = this.mapRef.current.getMap()
    this.map.on('zoomend', this.orderNodes)
    this.orderNodes()
  }

  render() {
    const { viewport } = this.state
    return (
      <div>
        <ReactMapGL
          {...viewport}
          width='100%'
          height='100vh'
          mapStyle='mapbox://styles/axbwh/ck4n9ufn50bor1cp62o1oa5yp'
          onViewportChange={this._updateViewport}
          onLoad={this.props.callback}
          dragRotate={false}
          mapboxApiAccessToken={TOKEN}
          ref={this.mapRef}>
          <Markers
            projects={this.state.projects}
            handleClick={this.getFocusNode}
            handleHover={this.getHoverNode}
            query={this.state.query}
            hover={this.state.hover}
            active={this.state.node}
          />
        </ReactMapGL>
        <Brand callback={this.getAbout} />
        <Search
          projects={this.state.projects}
          handleClick={this.getFocusNode}
          handleHover={this.getHoverNode}
          active={this.state.node}
        />
        <Nav node={this.state.node} callback={this.filterNodes} />
        {this.state.isAbout ? <About callback={this.getAbout} /> : null}
      </div>
    )
  }
}

export default Map
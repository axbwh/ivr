import React, { Component } from 'react'
import Map from './Map'
import Loader from './Loader'

import Data from './Data'
import 'mapbox-gl/src/css/mapbox-gl.css'
import './App.css'

class App extends Component {

  constructor() {
    super()
    this.state = {
      projects: [],
      isFetching: true,
      isLoading: true,
    }
    this.onDataLoad = this.onDataLoad.bind(this)
    this.onReady = this.onReady.bind(this)
  }

  onDataLoad = data => {
    this.setState({
      projects: data,
      isFetching: false
    })
  }

  onReady(){
    this.setState({
      isLoading: false
    })
  }

  componentDidMount() {
    new Data(this.onDataLoad)
  }

  render() {
    return (
      <div className='App'>
        {this.state.isLoading ? <Loader/> : null}
        {this.state.isFetching ? null :
          <Map projects={this.state.projects} callback={this.onReady}/>
        }
      </div>
    )
  }

  
}

export default App

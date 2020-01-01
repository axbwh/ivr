import React, { Component } from 'react'
import Map from './Map'
import Loader from './Loader'
import Data, {TOKEN} from './Data'
import 'mapbox-gl/src/css/mapbox-gl.css'
import './App.css'

class App extends Component {

  constructor() {
    super()
    this.state = {
      projects: [],
      isFetching: true
    }
    this.onDataLoad = this.onDataLoad.bind(this)
  }

  onDataLoad = data => {
    this.setState({
      projects: data,
      isFetching: false
    })
  }

  componentDidMount() {
    new Data(this.onDataLoad)
  }

  render() {
    return (
      <div className='App'>
        {this.state.isFetching ? <Loader /> :
          <Map projects={this.state.projects} callback={this.getFocusNode}/>
        }
      </div>
    )
  }

  
}

export default App

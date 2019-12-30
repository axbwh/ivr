import React, { Component } from 'react'
import Nav from './Nav'
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
      isFetching: true,
      focusNode: undefined,
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
        <Nav focusNode={this.state.focusNode} />
      </div>
    )
  }

  getFocusNode = node => {
    console.log(node.Name)
    this.setState({ focusNode: node })
  }
}

export default App

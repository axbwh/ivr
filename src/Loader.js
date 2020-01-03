import React, { Component } from 'react'
import Logo from './Logo'
import './Loader.css'



class Loader extends Component {

    render() {
        return (
            <div className='ivr-loader'>
            <Logo className='ivr-logo'/>
            <h1 className='ivr-title'>Indigenous <br/>VR</h1>
            </div>
        )
    }

}

export default Loader
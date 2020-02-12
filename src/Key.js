import React from "react";
import {Square, Circle} from './Icons'
import './Key.css'

const Key = props => (
    <div className='ivr-key'>
        <div className='row'>
            <Circle/>
            <h1>First Nation</h1>
        </div>
        <div className='row'>
            <Square/>
            <h1>Nation State</h1>
        </div>  
    </div>
)

export default Key
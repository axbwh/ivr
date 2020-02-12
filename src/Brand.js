import React from 'react'
import Logo from './Logo'
import './Brand.css'

const Brand = props => (
    <div onClick={ () => props.callback(true)} className='ivr-brand'>
        <h1>Fourth VR</h1>
        <Logo/>
    </div>
)

export default Brand
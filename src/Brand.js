import React, { Component } from 'react'
import Logo from './Logo'
import './Brand.css'

const Brand = props => (
    <a href='https://www.wgtn.ac.nz/seftms' target="_blank" rel="noopener noreferrer" className='ivr-brand'>
        <h1>Indigenous VR</h1>
        <Logo/>
    </a>
)

export default Brand
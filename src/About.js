import React, { Component } from 'react'
import Logo from './Logo'
import './About.css'
import { Cross } from './Icons'



class Loader extends Component {

    render() {
        return (
            <div className='ivr-about'>
                <Cross className='cross' onClick={ () => this.props.callback(false)}/>
                <a className='logo' href='https://www.wgtn.ac.nz/seftms' target="_blank" rel="noopener noreferrer">
                    <Logo />
                    <h1>Fourth <br/>VR</h1>
                </a>
                <div className='paragraph'>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis egestas integer eget aliquet. Magna etiam tempor orci eu lobortis elementum nibh tellus molestie. Pharetra sit amet aliquam id diam. Quam elementum pulvinar etiam non quam. </p>
                    <p>Scelerisque eu ultrices vitae auctor eu augue ut lectus. Aliquet porttitor lacus luctus accumsan tortor posuere. Neque viverra justo nec ultrices dui sapien eget mi proin. </p>
                </div>
            </div>
        )
    }

}

export default Loader
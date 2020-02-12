import React from 'react'

const Square = props => (
    <svg {...props} viewBox="0 0 10 10" preserveAspectRatio="xMinYMin meet">
        <polygon points='0,5 5,10 10,5 5,0'/>
    </svg>
)

const Circle = props => (
    <svg {...props} viewBox="0 0 10 10" preserveAspectRatio="xMinYMin meet">
        <circle cx="5" cy="5" r="4"/>
    </svg>
)

const Cross = props => (
    <svg {...props} viewBox="0 0 10 10" preserveAspectRatio="xMinYMin meet">
        <line x1="0" y1="0" x2="10" y2="10" />
        <line x1="0" y1="10" x2="10" y2="0" />
    </svg>
)

export {Square, Circle, Cross}
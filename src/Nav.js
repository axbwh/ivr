import React, { Component } from 'react'

class Check extends Component {

    constructor(props) {
        super(props)
        this.state = {
            checked: true
        }
        this.handleCheck = this.handleCheck.bind(this)
    }

    handleCheck() {
        this.setState(pState => {
            return { checked: !pState.checked }
        })
        this.props.callback(this.props.type) 
    }

    render() {
        console.log(this.props.type, this.state.checked)
        return (
            <div>
                <input type="checkbox" checked={this.props.checked} onChange={this.handleCheck} />
                <div>{this.props.type}</div>
            </div>
        )
    }
}

class Nav extends Component {

    constructor(props) {
        super(props)
        this.state = {
            types : ['Led', 'Collaboration', 'Inspired']
        }
        this.handleCheck = this.handleCheck.bind(this)
    }

    handleCheck(type, checked) {
        console.log('changed', type)
        // this.setState(prevState =>{
        //     prevState.map()
        // })

        // if ( this.state.types.includes(type) && checked === false) {
        //     this.setState({ types: this.state.types.filter(t => t !== type) })

        // } else if (!this.state.types.includes(type) && checked === true){
        //     this.setState({ type: this.state.types.push(type) })
            
        // }
        
    }


    render() {
        return (
            <div>
                <Check type='Led' callback={this.handleCheck} />
                <Check type='Collaboration' callback={this.handleCheck} />
                <Check type='Inspired' callback={this.handleCheck} />
            </div>
        )
    }

}

export default Nav
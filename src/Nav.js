import React, { Component } from 'react'
import DetailPane from './DetailPane'
import Key from './Key'
import './Nav.css'

class Check extends Component {
    render() {
        const label = this.props.bold ? <h1 className='nav-label mobile desktop'>{this.props.label}</h1>: <div className='nav-label desktop'>{this.props.label}</div>
        const shortLabel = this.props.type === 'Collaboration' ? 'Collab' : this.props.type
        
        return (
            <div className='nav-check-wrap' onClick={() => this.props.callback(this.props.type)}>
                <div className={`nav-checkbox ${this.props.type}`} >
                <div className={`nav-check ${!this.props.checked ? '' : 'nav-checked' }`} />    
                </div>
                {label} 
                {this.props.bold ? null : <div className='nav-label mobile'>{shortLabel}</div>}     
            </div>
        )
    }
}

class Nav extends Component {

    constructor(props) {
        super(props)
        this.state = {
            types: [{ type: 'Led', checked: true },
            { type: 'Partnership', checked: true },
            { type: 'Collaboration', checked: true }],
            detail: true
        }
        this.handleCheck = this.handleCheck.bind(this)
        this.handleDetail = this.handleDetail.bind(this)
    }

    handleCheck(type) {
        this.setState(prevState => {
            const newTypes = prevState.types.map(t => {

                t.checked = t.type === type ? !t.checked : t.checked

                return t
            })

            return {
                types: newTypes
            }
        },
            () => this.props.callback(this.state.types.filter(t => t.checked).map(t => t.type))
        )
    }

    handleDetail(detail) {
        this.setState(prevState => { return { detail: !prevState.detail } },
            ()=> {
                if(!this.state.detail){
                    document.documentElement.style.setProperty('--detail-offset',"0px")                    
                }else{
                    document.documentElement.style.setProperty('--detail-offset', "calc(19px + var(--padding) * 2)")
                }
            })
    }


    render() {

        return (
            <div className='nav-static'>
                <div className='nav-wrap'>

                    <div className='nav-filter-wrap'>
                    <h1 className='nav-label desktop'>Filter</h1>
                        {this.state.types.map(t => {

                            return <Check key={t.type} type={t.type} label={'Indigenous ' + t.type} checked={t.checked} callback={this.handleCheck} />
                        })}
                    </div>

                    <div className='nav-detail-wrap'>
                        {this.props.node ? <h1>{this.props.node.Name}</h1> : <div></div>}
                        <Check type={'Detail'} label={'Detail'} bold={true} checked={this.state.detail} callback={this.handleDetail} />
                    </div>
                </div>
                <Key />
                {
                    !(this.state.detail) ? null : (
                        <DetailPane node={this.props.node} />
                    )
                }
                
            </div>
        )
    }
}

export default Nav
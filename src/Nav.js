import React, { Component, Fragment } from 'react'
import DetailPane from './DetailPane'
import './Nav.css'

class Check extends Component {
    render() {

        return (
            <div className='nav-check-wrap'>
                <div className={`nav-checkbox ivr-${this.props.type}`} onClick={() => this.props.callback(this.props.type)}>
                <div className={`nav-check ${!this.props.checked ? '' : 'nav-checked' }`} />    
                </div>
                <div className='nav-label'>{this.props.label}</div>
            </div>
        )
    }
}

class Nav extends Component {

    constructor(props) {
        super(props)
        this.state = {
            types: [{ type: 'Led', checked: true },
            { type: 'Collaboration', checked: true },
            { type: 'Inspired', checked: true }],
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
        this.setState(prevState => { return { detail: !prevState.detail } })
    }


    render() {

        const styleChecks = {
            display: 'flex',
            flexDirection: 'row'
        }


        return (
            <Fragment>
                <div className='nav-wrap'>

                    <div className='nav-filter-wrap'>
                    <div className='nav-label'>Filter</div>
                        {this.state.types.map(t => {
                            return <Check key={t.type} type={t.type} label={'Indigenous ' + t.type} checked={t.checked} callback={this.handleCheck} />
                        })}
                    </div>

                    <div className='nav-detail-wrap'>
                        {this.props.node ? <div>{this.props.node.Name}</div> : <div></div>}
                        <Check type={'Detail'} label={'Detail'} checked={this.state.detail} callback={this.handleDetail} />
                    </div>

                </div>
                {
                    !(this.state.detail) ? null : (
                        <DetailPane node={this.props.node} />
                    )
                }
            </Fragment>
        )
    }
}

export default Nav
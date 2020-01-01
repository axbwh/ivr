import React, { Component, Fragment } from 'react'
import DetailPane from './DetailPane'

class Check extends Component {
    render() {

        const style = {
            display: 'flex',
            flexDirection: 'row'
        }

        return (
            <div style={style}>
                <input type="checkbox" checked={this.props.checked} onChange={() => this.props.callback(this.props.type)} />
                <div>{this.props.type}</div>
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
        const style = {
            position: 'fixed',
            top: 0,
            left: 0,
            padding: 20,
            display: 'flex',
            flexDirection: 'row',
            width: 'calc(100% - 40px)',
            justifyContent: 'space-between'
        }

        const styleChecks = {
            display: 'flex',
            flexDirection: 'row'
        }

        const styleDetail = {
            position: 'fixed',
            top: 40,
            right: 0,
            padding: 20,
            background:'white',
            boxShadow:'0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
        }

        return (
            <Fragment>
                <div style={style}>

                    <div style={styleChecks}>
                        {this.state.types.map(t => {
                            return <Check key={t.type} type={t.type} checked={t.checked} callback={this.handleCheck} />
                        })}
                    </div>

                    <div style={styleChecks}>
                        { this.props.node ? <div>{this.props.node.Name}</div> : null}
                        <Check type={'detail'} checked={this.state.detail} callback={this.handleDetail} />
                    </div>

                </div>
                {
                    this.state.detail && this.props.node ? (
                        <div style={styleDetail}>
                            <DetailPane node={this.props.node} />
                        </div>
                    ) : (null)
                }
            </Fragment>
        )
    }
}

export default Nav
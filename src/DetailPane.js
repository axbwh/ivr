import React, { Component, Fragment } from 'react'
import ReactPlayer from 'react-player'
import Img from 'react-image'
import './DetailPane.css'
import { Scrollbars } from 'react-custom-scrollbars'


class DetailPane extends Component {

    render() {

        return (
            <div className='detail-pane'>
                <Scrollbars
                    autoHeight
                    autoHeightMin={0}
                    autoHeightMax={'60vh'}
                    renderThumbVertical={props => <div {...props} className="thumb-vertical" />}>

                    <div className='detail-wrap'>

                        {!this.props.node ?
                            <div className='detail-center'>
                                <i>Select A Node to View Project Details</i>
                            </div> : <Fragment>
                                {this.parseMedia(this.props.node.Media, this.props.node.Website)}
                                {this.row('Indigenous ' + this.props.node.Type, this.props.node.Year, true, true)}
                                {this.parseList('Indigenous Nation', this.props.node.IndigenousNation)}
                                {this.parseList('Medium', this.props.node.Medium)}
                                {this.parseList('Platform', this.props.node.Platform)}
                                {this.row('Website |', this.parseWebsite(this.props.node.Website))}
                                {this.parseList('Creative', this.props.node.Creatives)}
                                {this.parseResume(this.props.node.Resume)}
                            </Fragment>
                        }

                    </div>

                </Scrollbars>
            </div>
        )
    }

    row(left, right, bold = false, vital = false) {

        let style = !bold ? '' : ' bold'

        let el = (<div className={'detail-row' + style}>
                    { !left ? null : <div className='detail-row-left'><div>{left}</div></div>}
                    { !right ? null : <div className='detail-row-right'><div>{right}</div></div>}
                 </div> )

        return !right && !vital ? null : el
    }


    parseMedia(media, website) {

        if (ReactPlayer.canPlay(media)) {
            return (
                <div className='detail-player-wrap'>
                    <ReactPlayer className='detail-player'
                        url={this.props.node.Media}
                        width='100%'
                        height='100%'
                    />
                </div>
            )
        }

        return (
            <div>
                <a href={website} target="_blank" rel="noopener noreferrer">
                    <Img className='detail-img'
                        src={media}
                    />
                </a>
            </div>
        )


    }

    parseWebsite(website) {
        return !website ? null : (
            <a rel="noopener noreferrer" target="_blank" href={this.props.node.Website}>{this.props.node.Name}</a>
        )
    }

    parseList(lbl, lst) {

        const list = lst.toLowerCase() === 'unknown' ? false : lst

        if(!list) return

        const array = list.split(',').map( i => i.trim())

        const label = array.length > 1 ? lbl + 's |' : lbl + ' |'

        return (
                <div className='detail-row'>
                    <div className='detail-row-left'><div>{label}</div></div>
                    <div className='detail-row-right'>{array.map(c => <div key={c}>{c}</div>)}</div>
                </div>

        )
    }

    parseResume(resume) {
       let paragraphs = !resume ? null : resume.replace(/[\u200B-\u200D\uFEFF]/g, ' ').split(/\r?\n|\r/).map(s => s.trim()).filter(s => s)
        return !paragraphs ? null : (
            <Fragment>
                <hr />
                {paragraphs.map(p => <p>{p}</p>)}
            </Fragment>
        )

    }



}

export default DetailPane
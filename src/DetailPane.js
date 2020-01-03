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
                                { !this.props.node.Type ? null : <div className='detail-row'><h1> {`Indigenous ${this.props.node.Type}`}</h1></div>}
                                {this.row('Indigenous Nation |', this.props.node.IndigenousNation)}
                                {this.row('Platform |', this.props.node.Platform)}
                                {this.row('Website |', this.parseWebsite(this.props.node.Website))}
                                {this.parseCreatives(this.props.node.Creatives)}
                                {this.parseResume(this.props.node.Resume)}
                            </Fragment>
                        }

                    </div>

                </Scrollbars>
            </div>
        )
    }

    row(left, right) {

        return !right ? null : (
            <div className='detail-row'>
                <div className='detail-row-left'><div>{left}</div></div>
                <div className='detail-row-right'><div>{right}</div></div>
            </div>
        )
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

    parseCreatives(creatives) {

        const array = creatives.split(',')

        return !creatives ? null : (
            <div className='detail-row'>
                <div className='detail-row-left'><div>Creatives |</div></div>
                <div className='detail-row-right'>{array.map(c => <div key={c}>{c}</div>)}</div>
            </div>
        )
    }

    parseResume(resume) {

        return !resume ? null : (
            <Fragment>
                <hr />
                <p>{resume}</p>
            </Fragment>
        )

    }



}

export default DetailPane
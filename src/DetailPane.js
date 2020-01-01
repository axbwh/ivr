import React, { Component, Fragment } from 'react'
import ReactPlayer from 'react-player'
import Img from 'react-image'


class DetailPane extends Component {

    render() {
        const media = this.props.node.Media
        const style = {
            position: 'relative',
            width: 400,
        }

        return (
            <div style={style}>
                {this.parseMedia(this.props.node.Media, <p>{this.props.node.Website}</p>)}
                {this.row('Indigenous |', this.props.node.Type)}
                {this.row('Indigenous Nation |', this.props.node.IndigenousNation)}
                {this.row('Platform |', this.props.node.Platform)}
                {this.row('Website |', )}
                {this.row('Creatives |', this.parseCreatives(this.props.node.Creatives))}
                {this.parseResume(this.props.node.Resume)}
            </div>
        )
    }

    row(left, right) {

        const styleDiv = {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 16,
            marginBottom: 16
        }

        return !right ? null : (
            <div style={styleDiv}>
                <div>{left}</div>
                <div>{right}</div>
            </div>
        )
    }


    parseMedia(media, website) {

        if (ReactPlayer.canPlay(media)) {
            return (
                <div style={{ position: 'relative', paddingTop: '56.25%', width: '100%' }}>
                    <ReactPlayer style={{ position: 'absolute', top: 0, left: 0 }}
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
                    <Img style={{ width: '100%' }}
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
            array.map(c => <div key={c}>{c}</div>)
        )
    }

    parseResume(resume) {

        return !resume ? null :(
            <Fragment>
                <hr />
                <p>{resume}</p>
            </Fragment>
        )

    }



}

export default DetailPane
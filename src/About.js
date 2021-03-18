import React, { Component } from 'react'
import Logo from './Logo'
import './About.css'
import { Cross, Circle, Square } from './Icons'
import { Scrollbars } from 'react-custom-scrollbars'



class Loader extends Component {

    render() {
        return (
            <div className='ivr-about'>
                 <Scrollbars
                    autoHeight
                    autoHeightMin={0}
                    autoHeightMax={'100vh'}
                    renderThumbVertical={props => <div {...props} className="thumb-vertical" />}>
                <div className='content'>
                <a className='logo' href='https://www.wgtn.ac.nz/seftms' target="_blank" rel="noopener noreferrer">
                    <Logo />
                    <h1>Fourth <br/>VR</h1>
                </a>
                <div className='paragraph'>
                    <p>Throughout the development of Virtual Reality (VR), Indigenous creatives have found ways to access, adapt and innovate VR technology. Building on the use of ‘Fourth Cinema’ to describe Indigenous Cinema, we use the term ‘Fourth VR’ to capture the rich array of VR work that maintain Indigenous visual sovereignty. Fourth VR spans all the major platforms with projects available via the Oculus Store, Viveport, Steam, and YouTube. The works also display a variety of genre forms from VR games to non-narrative experimental artworks to cinematic VR experiences. This database currently displays all Fourth VR works that we are currently aware of, yet we know that we will not have captured all existing works. We also know that there are more works in production and the picture will only widen in coming years. </p>
                    <p>Fourth VR spans the globe with production locations extending from Inuit lands in the far north to Aotearoa New Zealand in the south. Wherever, possible we have geolocated the VR works to sites of production and/or location of the storytelling. The <Circle/> on the map represents this geolocation. When specific geolocation information is not available, the work is marked by a <Square/> to indicate that the location refers to the nation-state in which the VR work was produced.</p>
                    <p>We have also sorted works into 3 categories:</p>
                    <p className='indent'><b>Indigenous Led</b> refers to works where the project has been driven by Indigenous creators, frequently meaning that leadership roles such as director and producer are performed by Indigenous practitioners. </p>
                    <p className='indent'><b>Indigenous Partnership </b>refers to works where Indigenous practitioners contribute to and are extensively involved in various levels of production, for example as producer, writer or designer, even though non-Indigenous practitioners may perform key creative and technical roles. </p>
                    <p className='indent'><b>Indigenous Collaboration</b> refers to works where Indigenous practitioners do not normally fulfill substantial creative or technical roles but have participated and contributed to the way their stories are told. This latter category can include extensive consultation and/or input into the final work but can also include scenarios where Indigenous organisations contract non-Indigenous companies to create the work. </p>
                    <p>We recognise that these categories are fluid and heuristic. They are not hierarchical but rather identify the dynamic ways Indigenous communities are engaging with VR worlds. </p>
                    <p>Overall this database presents a wide-angle, zoom-lens, picture of the landscape of Indigenous VR works. It offers a clear demonstration of the capacity of Indigenous creatives to produce their own narratives within the VR medium.</p>
                    <p>Keziah Wallis (Kāi Tahu)</p>
                    <p>Miriam Ross</p>
                    <p>Questions about the database can be directed to <a href='mailto:keziah.wallis@ufv.ca'> keziah.wallis@ufv.ca</a></p>
                </div>
                </div>
                </Scrollbars>
                <Cross className='cross' onClick={ () => this.props.callback(false)}/>
            </div>
        )
    }

}

export default Loader
import Tabletop from 'tabletop'
import mapboxgl from 'mapbox-gl'
import mapboxGeo from '@mapbox/mapbox-sdk/services/geocoding'
import _ from 'lodash'

const tableKey = 'https://docs.google.com/spreadsheets/d/1-sK-WkmTl6jxObbsbMDxJtLcMQGbev7U0Xed0barAeQ/edit?usp=sharing'

mapboxgl.accessToken = 'pk.eyJ1IjoiYXhid2giLCJhIjoiY2s0bmpmZWlrMzNqYTNubmFhdzRpcWpwciJ9.suGRP9vc9Hv2POzpHBQ3-g'
const geocoding = mapboxGeo({ accessToken: mapboxgl.accessToken })

const isLat = (lat) => {
    return isFinite(parseFloat(lat)) && Math.abs(lat) <= 90;
}

const isLng = (lng) => {
    return isFinite(parseFloat(lng)) && Math.abs(lng) <= 180;
}

class Data {
    constructor(callback) {
        this.callback = callback
        Tabletop.init({
            key: tableKey,
            simpleSheet: true
        }).then(this.processData)
    }

    processData = data => {

        //We need to geocode all projects without lat & lng fields
        //We split projects with lat lng in one array
        let projectsGeo = data.filter(p => isLat(p.Lat) && isLng(p.Lng))

        //Projects with location queries into another, projects with neither are ignored
        let projectsQry = _.difference(data, projectsGeo).filter(p => Boolean(p.Location))

        //To limit forward geocoding requests, we only request unique locations queries
        let uniqueQueries = _.uniq(projectsQry.map(p => p.Location))

        //Geocode location queries, store promise in array
        let geoPromises = []

        uniqueQueries.forEach(q => {
            geoPromises.push(geocoding.forwardGeocode({
                query: q,
                limit: 1
            }).send())
        })

        //Once all geocoding promises are done, store query and latlng center in array
        Promise.all(geoPromises).then(results => {

            let geoQueries = results.map(r => {
                return { query: r.body.query[0], center: r.body.features[0].center }
            })

            //iterate over query results, and add lng/lat to every matching project
            geoQueries.forEach(g => {
                projectsQry.forEach(p => {
                    // console.log(p.Location.toLowerCase(), g.query)
                    if (p.Location.toLowerCase() === g.query) {
                        p.Lng = g.center[0]
                        p.Lat = g.center[1]
                    }
                })
            })
            // merge both arrays and callback
            this.callback(projectsQry.concat(projectsGeo))
        })

    }
}


export default Data
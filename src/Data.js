import Tabletop from 'tabletop'
import mapboxGeo from '@mapbox/mapbox-sdk/services/geocoding'
import _ from 'lodash'
import { isLogicalExpression } from '@babel/types'

const tableKey = 'https://docs.google.com/spreadsheets/d/1-sK-WkmTl6jxObbsbMDxJtLcMQGbev7U0Xed0barAeQ/edit?usp=sharing'
const TOKEN = 'pk.eyJ1IjoiYXhid2giLCJhIjoiY2s0bmpmZWlrMzNqYTNubmFhdzRpcWpwciJ9.suGRP9vc9Hv2POzpHBQ3-g'

const geocoding = mapboxGeo({ accessToken: TOKEN })

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

        data.forEach(p =>{
            p.Location = p.Location.replace(/[^\w ]/g, '')
            p.x = 0
            p.y = 0
        })

        //We need to geocode all projects without lat & lng fields
        //We split projects with lat lng in one array
        let projectsGeo = data.filter(p => {
            p.Lat = parseFloat(p.Lat)
            p.Lng = parseFloat(p.Lng)
            return isLat(p.Lat) && isLng(p.Lng)
        })

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
                return { query: r.body.query.join(' '), center: r.body.features[0] ? r.body.features[0].center : [0,0] }
            })

            //iterate over query results, and add lng/lat to every matching project
            geoQueries.forEach(g => {
                projectsQry.forEach(p => {
                    if (p.Location.toLowerCase() === g.query) {
                        p.Lng = g.center[0]
                        p.Lat = g.center[1]
                    }
                })
            })

            let dataParsed = projectsQry.concat(projectsGeo).filter(p => isLat(p.Lat) && isLng(p.Lng))

            dataParsed.forEach(p => {
                p.sLng = p.Lng 
                p.sLat = p.Lat
            })
            // merge both arrays and callback
            this.callback(dataParsed)
        })

    }
}


export default Data
export {TOKEN}
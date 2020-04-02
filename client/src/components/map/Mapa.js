import React, { Component } from 'react'
import { Map, TileLayer, Marker } from 'react-leaflet';
//import { OpenStreetMapProvider } from 'leaflet-geosearch';

//import axios from 'axios'
import "../../css/App.css";
import MarkerClusterGroup from "./MarkerClusterGroup";

require('react-leaflet-markercluster/dist/styles.min.css');
//const provider = new OpenStreetMapProvider();

class Mapa extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            places: []
        };
    }
    componentDidMount() {

        // if(this.props.data.length === 0) return;
        // this.searchForLatLng().then();

    }

    async searchForLatLng() {
        //
        // let res = await axios.post('/places', this.state.data.searchBody);
        // let array_of_places = res.data;
        // //array_of_places = array_of_places.data.map(e => e['mesto']);
        // //console.log(array_of_places)
        // //array_of_places = await Promise.all(array_of_places.map(e => {
        // //    return provider.search({query: e})
        // //}));
        // console.log(array_of_places)
        //
        // //array_of_places = array_of_places.map(e => e[0]);
        // this.setState({
        //     places: array_of_places
        // });
    }


    render() {
        const position = [44.5, 19.5];
        const  zoom = 6;
        return (
            <div >
                {/*<label>Mapa za {this.state.data.name}</label>*/}
                <Map center={position} zoom={zoom} maxZoom={18}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />react
                    <MarkerClusterGroup>
                        {/*{this.state.places.map((e, i) => {*/}

                        {/*    if(e === undefined) return {};*/}
                        {/*    return(*/}

                        {/*        <Marker key={i} position={[e['lat'], e['lng']]}>*/}

                        {/*        </Marker>*/}

                        {/*    )*/}
                        {/*})}*/}
                    </MarkerClusterGroup>
                </Map>
            </div>
        )
    }
}


export default Mapa

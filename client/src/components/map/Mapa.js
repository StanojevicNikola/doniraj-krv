import React, { Component } from 'react'
import { Map, TileLayer, Marker } from 'react-leaflet';
//import { OpenStreetMapProvider } from 'leaflet-geosearch';

//import axios from 'axios'
import "../../css/App.css";
import MarkerClusterGroup from "./MarkerClusterGroup";
import axios from "axios";

require('react-leaflet-markercluster/dist/styles.min.css');
//const provider = new OpenStreetMapProvider();

class Mapa extends Component{
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            data: props.data,
            places: []
        };
    }
    async componentDidMount() {

        let res = await axios('/app/getCities');
        console.log(res.data);
        this.setState({
            places: res.data.data
        });

    }


    render() {
        const position = [44.5, 19.5];
        const  zoom = 6;
        return (
            <div >

                <Map center={position} zoom={zoom} maxZoom={18}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />react
                    <MarkerClusterGroup>
                        {this.state.places.map((e, i) => {
                            if(e === undefined) return {};

                           return(

                               <Marker key={i} position={[e['lat'], e['lng']]}>

                                </Marker>

                            )
                        })}
                    </MarkerClusterGroup>
                </Map>
            </div>
        )
    }
}


export default Mapa

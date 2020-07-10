import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
//import { OpenStreetMapProvider } from 'leaflet-geosearch';

import "../../css/App.css";
import MarkerClusterGroup from "./MarkerClusterGroup";


import L from 'leaflet';
require('react-leaflet-markercluster/dist/styles.min.css');
//const provider = new OpenStreetMapProvider();

export default class Mapa extends Component{
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            data: props.data,
            places: [],
            mapClick: null
        };

        const mapRef = React.createRef();
        this.renderMarker = this.renderMarker.bind(this);
        this.renderCluster = this.renderCluster.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(e){
        this.setState({ mapClick: e.latlng });
        console.log(e.latlng)
        console.log(this.state.mapClick && !this.props.cluster)
    }

    renderCluster() {
        return (
            <MarkerClusterGroup>
                    {this.props.data.map((e, i) => {
                        if(e === undefined) return {};

                        return(

                            <Marker key={i} position={[e['geolocation']['lat'], e['geolocation']['lng']]}>

                            </Marker>

                        )
                    })}
                </MarkerClusterGroup>
        );
    }

    renderMarker() {
        return(
            <div>
                {this.props.data.map((e, i) => {
                        if(e === undefined) return {};

                        return(

                            <Marker key={i} position={[e['geolocation']['lat'], e['geolocation']['lng']]}>
                                <Popup position={[e['geolocation']['lat'], e['geolocation']['lng']]}>
                                <pre>
                                    {"Ime: " + e.name + 
                                    "\nAdresa: " + e.address + 
                                    "\nRadno vreme: " + e.workingHours}
                                </pre>
                                </Popup>
                            </Marker>

                        )
                    })}
            </div>
        );
    }

    render() {
        if(this.props.data === null) {
            return (
                <div>Mapa</div>
            );
        }
        const position = [44.5, 19.5];
        const  zoom = 6;
        return (
            <Map ref={this.mapRef} center={position} zoom={zoom} maxZoom={18} onClick={this.handleClick}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />
                {this.props.cluster ? this.renderCluster() : this.renderMarker()}
                
            </Map>
        )
    }
}



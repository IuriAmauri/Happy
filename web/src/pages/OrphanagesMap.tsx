import React from 'react';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Leaftlet from 'leaflet';

import mapMarkerImg from '../images/map-marker.svg';
import '../styles/pages/orphanages-map.scss';
import 'leaflet/dist/leaflet.css';

const mapIcon = Leaftlet.icon({
    iconUrl: mapMarkerImg,
    iconSize: [58,68],
    iconAnchor: [29,68],
    popupAnchor: [170,2]
});

function OrphanagesMap() {
    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={ mapMarkerImg } alt="marker"/>

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando sua visita</p>
                </header>

                <footer>
                    <strong>Blumenau</strong>
                    <span>Santa Catarina</span>
                </footer>
            </aside>

            <Map center={[-26.9015848, -49.0918178]} zoom={15} style={{ width: '100%', height: '100%'}}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[-26.9015848, -49.0918178]} icon={ mapIcon }>
                    <Popup className="map-popup" closeButton={ false } minWidth={ 240 } maxWidth={ 240 }>
                        Lar das Meninas
                        <Link to="/orphanages/1">
                            <FiArrowRight />
                        </Link>
                    </Popup>
                </Marker>
            </Map>

            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={ 32 } color="#FFF"/>
            </Link>
        </div>
    );
}

export default OrphanagesMap;

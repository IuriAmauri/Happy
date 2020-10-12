import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Map } from 'react-leaflet';
import { TileLayer } from 'react-leaflet';

import mapMarkerImg from '../images/map-marker.svg';
import '../styles/pages/orphanages-map.scss';
import 'leaflet/dist/leaflet.css';

function OrphanagesMap() {
    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={ mapMarkerImg } alt="marker"/>

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando sua visita :)</p>
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
            </Map>

            <Link to="" className="create-orphanage">
                <FiPlus size={ 32 } color="#FFF"/>
            </Link>
        </div>
    );
}

export default OrphanagesMap;
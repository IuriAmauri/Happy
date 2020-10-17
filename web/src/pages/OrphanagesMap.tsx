import React, { useEffect, useState } from 'react';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import api from '../services/api';

import mapIcon from '../utils/mapIcon';
import mapMarkerImg from '../images/map-marker.svg';
import '../styles/pages/orphanages-map.scss';

interface Orphanage {
    id: number,
    name: string,
    latitude: number,
    longitude: number
}

function OrphanagesMap() {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

    useEffect(() => {
        getOrphanages()
    }, []);

    async function getOrphanages() {
        const response = await api.get('orphanages');
        setOrphanages(response.data);
    }

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
                
                {orphanages.map(orphanage => {
                    return (
                        <Marker key={ orphanage.name } position={[orphanage.latitude, orphanage.longitude]} icon={ mapIcon } >
                            <Popup className="map-popup" closeButton={ false } minWidth={ 240 } maxWidth={ 240 }>
                                { orphanage.name }
                                <Link to={`/orphanages/${ orphanage.id }`}>
                                    <FiArrowRight />
                                </Link>
                            </Popup>
                        </Marker>
                    );
                })}
            </Map>

            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={ 32 } color="#FFF"/>
            </Link>
        </div>
    );
}

export default OrphanagesMap;

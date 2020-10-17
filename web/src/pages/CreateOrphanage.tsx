import React, { ChangeEvent, FormEvent, useState } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import Sidebar from "../components/Sidebar";
import { LeafletMouseEvent } from "leaflet";
import { FiPlus } from "react-icons/fi";
import mapIcon from "../utils/mapIcon";

import '../styles/pages/create-orphanage.scss';
import api from "../services/api";
import { useHistory } from "react-router-dom";

export default function CreateOrphanage() {
  const history = useHistory();

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [openningHours, setOpenningHours] = useState('');
  const [openOnWeekends, setOpenOnWeekends] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  function handleMapClick(e: LeafletMouseEvent ) {
    const { lat, lng } = e.latlng;

    setPosition({
      latitude: lat,
      longitude: lng
    });
  }

  function handleSelectImages(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files)
      return;
    
    const selectedImages = Array.from(e.target.files);
    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image);
    });

    setPreviewImages(selectedImagesPreview);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    
    const { latitude, longitude } = position;
    const data = new FormData();
    
    data.append('Name', name);
    data.append('Latitude', String(latitude));
    data.append('Longitude', String(longitude));
    data.append('About', about);
    data.append('Instructions', instructions);
    data.append('OpenningHours', openningHours);
    data.append('OpenOnWeekends', String(openOnWeekends));

    images.forEach(image => {
      data.append('images', image);
    });

    await api.post('orphanages', data);
    history.push('/app');
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar />
      <main>
        <form onSubmit={ handleSubmit } className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-26.9015848, -49.0918178]}
              style={{ width: '100%', height: 280 }}
              zoom={ 15 }
              onclick={handleMapClick}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
              
              { (position.latitude !== 0) && (<Marker interactive={ true } icon={ mapIcon } position={ [position.latitude,position.longitude] } />) }
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" value={ name } onChange={ e => setName(e.target.value) }/>
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="about" maxLength={300}  value={ about } onChange={ e => setAbout(e.target.value) } />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>              
              <div className="images-container">
                {
                  previewImages.map(image => {
                    return (
                      <img key={ image } src={ image } alt={ name }/>
                    );
                  })
                }

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>

              <input multiple type="file" id="image[]" onChange={ handleSelectImages }/>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" value={ instructions } onChange={ e => setInstructions(e.target.value) }/>
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input id="openingHours" value={ openningHours } onChange={ e => setOpenningHours(e.target.value) }/>
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button type="button" className={ openOnWeekends ? "active" : "" } onClick={ () => setOpenOnWeekends(true) }>Sim</button>
                <button type="button" className={ !openOnWeekends ? "active" : "" } onClick={ () => setOpenOnWeekends(false) }>Não</button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

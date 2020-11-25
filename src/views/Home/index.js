import { useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import seekerImage from "../../assets/images/seeker.png";
import { spotifyTokenResponse } from "../../recoil/auth/atoms";
import { spotifyResult } from "../../recoil/songs/atoms";
import { spotifySearchCall } from "../../utils";
import HomeFilters from "../../components/HomeFilters";
import { filterType as filterTypeSelector } from "../../recoil/songs/selectors";
import "./style.css";
import Track from "../../components/Track";
import Album from "../../components/Album";
import Artist from "../../components/Artist";
import Episode from "../../components/Episode";
import Playlist from "../../components/Episode";

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [tokenResponse] = useRecoilState(spotifyTokenResponse);
  const [searchResponse, setSearchResponse] = useRecoilState(spotifyResult);
  const [filterType] = useRecoilState(filterTypeSelector);
  const resetFilter = useResetRecoilState(filterTypeSelector);

  const handleSearchClick = async () => {
    let type = filterType ?? "track";
    const paramsArray = [{
      q: searchText
    }, {
      type,
    }, {
      offset: 50,
    }];

    const response = await spotifySearchCall(paramsArray, tokenResponse.access_token);
    setSearchResponse(response);
  };

  const handleResetFilterClick = () => {
    resetFilter();
    setSearchResponse([]);
    setSearchText("");
  };

  return (
    <div className="home">
      <div style={{ backgroundImage: `url(${seekerImage})` }} className="home-cover-container" />
      <h2 className="home-title">Busca tu canción favorita</h2>
      <div className="home-searchbox">
        <input type="text" className="home-searchbox-input" value={searchText} onChange={({ target: { value }}) => setSearchText(value)} />
        <button className="home-searchbox-button" onClick={handleSearchClick}>Buscar</button>
      </div>
      <HomeFilters />
      <button onClick={handleResetFilterClick} className="home-clean-filters-button">Limpiar filtros</button>

      {searchResponse?.tracks?.items && (
        <div className="home-tracks-container">
          <p className="home-tracks-title">Canciones</p>
          <div className="home-tracks-container-items">
            {searchResponse?.tracks?.items?.map((item, index) => <Track key={index} {...item} />)}
          </div>
        </div>
      )}

      {searchResponse?.albums?.items && (
        <div className="home-albums-container">
          <p className="home-albums-title">Album</p>
          <div className="home-albums-container-items">
            {searchResponse?.albums?.items?.map((item, index) => <Album key={index} {...item} />)}
          </div>
        </div>
      )}

      {searchResponse?.artists?.items && (
        <div className="home-artists-container">
          <p className="home-artists-title">Artista</p>
          <div className="home-tracks-container-items">
            {searchResponse?.artists?.items?.map((item, index) => <Artist key={index} {...item} />)}
          </div>
        </div>
      )}

      {searchResponse?.episodes?.items && (
        <div className="home-episodes-container">
          <p className="home-episodes-title">Episodios</p>
          <div className="home-episodes-container-items">
            {searchResponse?.episodes?.items?.map((item, index) => <Episode key={index} {...item} />)}
          </div>
        </div>
      )}

      {searchResponse?.playlists?.items && (
        <div className="home-playlists-container">
          <p className="home-playlists-title">Playlists</p>
          <div className="home-playlists-container-items">
            {searchResponse?.playlists?.items?.map((item, index) => <Playlist key={index} {...item} />)}
          </div>
        </div>
      )}
    </div>
  );
}
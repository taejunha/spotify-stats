import React, { useState, useEffect } from "react";
import "../style/mainpage.css";

//import { redirectToAuthCodeFlow, getAccessToken, refreshAccessToken, isTokenExpired } from "../authCodeWithPkce";

const timeRangeMap = {
  'last 4 weeks': 'short_term',
  'last 6 months': 'medium_term',
  'last 12 months': 'long_term'
};

async function fetchUserTopTracks(accessToken, timeRange) {
  const response = await fetch(`/top_tracks?access_token=${accessToken}&time_range=${timeRange}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  console.log(response);
  return await response.json();
}

async function fetchUserTopArtists(accessToken, timeRange) {
  const response = await fetch(`/top_artists?access_token=${accessToken}&time_range=${timeRange}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  console.log(response);
  return await response.json();
}

export function MainPage() {
  const [accessToken, setAccessToken] = useState(null);
  const [timeSlot, setTimeSlot] = useState('last 4 weeks');
  const [displayContent, setDisplayContent] = useState('tracks'); 
  const [content, setContent] = useState([]);

  const handleTimeSlotChange = async (newTimeSlot) => {
    setTimeSlot(newTimeSlot);
    const timeRange = timeRangeMap[newTimeSlot];
    try {
      const data = displayContent === 'tracks'
        ? await fetchUserTopTracks(accessToken, timeRange)
        : await fetchUserTopArtists(accessToken, timeRange);

      
      setContent(data.items); 
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const token = params.get('access_token');
    setAccessToken(token);

    let isSubscribed = true;
    const timeRange = timeRangeMap[timeSlot];

    const fetchData = async () => {
      try {
        const data = displayContent === 'tracks'
          ? await fetchUserTopTracks(token, timeRange)
          : await fetchUserTopArtists(token, timeRange);

          if (isSubscribed && data && Array.isArray(data.items)) {
            setContent(data.items.map(item => {
              const defaultImage = { url: 'default_image.jpg' };
              const defaultTrackName = 'Unknown Track';
              const defaultArtistName = 'Unknown Artist';
            
              return {
                ...item,
                name: item.name || defaultTrackName, // use track name or a default
                album: item.album ? {
                  ...item.album,
                  images: item.album.images && item.album.images.length > 0 ? item.album.images : [defaultImage]
                } : { images: [defaultImage] }, // use the album's images or a default image
                artists: item.artists && item.artists.length > 0 ? 
                  item.artists.map(artist => ({
                    ...artist,
                    name: artist.name || defaultArtistName // use artist's name or a default
                  })) : 
                  [{ name: defaultArtistName }] // provides default artist if none are present
              };
            }));
          }
        } catch (error) {
          console.error(error);
        }
      };

    if (token) {
      fetchData();
    }
    console.log(content);
    return () => isSubscribed = false;
  }, [timeSlot, displayContent]);

  // handle dropdown selection
  const handleSelectionChange = (event) => {
    setDisplayContent(event.target.value);
  };
  
  return (
    <>
      <nav className="tracknavbar">
        <select
          className="content-select"
          value={displayContent}
          onChange={handleSelectionChange}>
          <option value="tracks">Top Tracks</option>
          <option value="artists">Top Artists</option>
        </select>
        <ul className="time-period">
          <li onClick={() => handleTimeSlotChange('last 4 weeks')}>
            <button type="button">Last 4 weeks</button>
          </li>
          <li onClick={() => handleTimeSlotChange('last 6 months')}>
            <button type="button">Last 6 months</button>
          </li>
          <li onClick={() => handleTimeSlotChange('last 12 months')}>
            <button type="button">Last 12 months</button>
          </li>
        </ul>
      </nav>
      <h2 className="track-heading">Your top {displayContent === 'tracks' ? 'tracks' : 'artists'} from the {timeSlot}!</h2>
        <div className="content-list">
          {displayContent === 'tracks' ? (
            <ol className="top-tracks-list">
              {content.map((track, index) => {
                const imageSrc = track.album?.images?.[0]?.url || 'default_album_image.jpg';
                return (
                  <li key={track.id} className="top-track">
                    <img src={imageSrc} alt={`${track.name} album cover`} className="album-cover" />
                    <div className="track-info">
                      <span className="track-name">
                        {track.name}
                      </span>
                      <span className="track-artists">
                        {track.artists.map((artist) => artist.name).join(", ")}
                      </span>
                    </div>
                    <span className="track-pop">
                      {track.popularity}
                    </span>
                  </li>
                );
              })}
            </ol>
          ) : (
            <ol className="top-artists">
              {content.map((artist, index) => {
                const artistImageSrc = artist.images?.[0]?.url || 'default_artist_image.jpg';
                return (
                  <li key={artist.id} className="top-artist">
                    <img src={artistImageSrc} alt={artist.name} className="artist-image" />
                    <span className="artist-name">
                      {artist.name}
                    </span>
                    <span className="artist-pop">
                      {artist.popularity}
                    </span>
                  </li>
                );
              })}
            </ol>
          )}
        </div>
    </>
  );
}
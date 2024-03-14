import React, { useState, useEffect } from "react";
import "../style/toptracks.css";
//import { redirectToAuthCodeFlow, getAccessToken, refreshAccessToken, isTokenExpired } from "../authCodeWithPkce";

const timeRangeMap = {
  'last 4 weeks': 'short_term',
  'last 6 months': 'medium_term',
  'all time': 'long_term'
};

async function fetchUserTopTracks(accessToken, timeRange) {
  const response = await fetch(`/top_tracks?access_token=${accessToken}&time_range=${timeRange}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

export function TopTracks() {
  const [accessToken, setAccessToken] = useState(null);
  const [timeSlot, setTimeSlot] = useState('last 4 weeks');
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    // Extract the access token from the URL hash
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const token = params.get('access_token');

    setAccessToken(token);

    let isSubscribed = true;
    if (token) {
      const timeRange = timeRangeMap[timeSlot];
      fetchUserTopTracks(token, timeRange)
        .then(data => {
          if (isSubscribed) {
            setTracks(data.items);
          }
        })
        .catch(console.error);
    }

    return () => isSubscribed = false;
  }, [timeSlot]);

  const handleTimeSlotChange = (newTimeSlot) => {
    setTimeSlot(newTimeSlot);
  }

  return (
    <>
      <h2 className="track-heading">Your Top Tracks!</h2>
      <nav className="tracknavbar">
        <ul>
          <li onClick={() => handleTimeSlotChange('last 4 weeks')}>
            <button type="button">Last 4 weeks</button>
          </li>
          <li onClick={() => handleTimeSlotChange('last 6 months')}>
            <button type="button">Last 6 months</button>
          </li>
          <li onClick={() => handleTimeSlotChange('all time')}>
            <button type="button">All time</button>
          </li>
        </ul>
      </nav>
      <ol className="top-tracks-list">
        {tracks.map((track, index) => (
          <li key={index} className="top-track">
            <span className="track-number">{index + 1}.</span>
            <img
              src={track.album.images[0].url} // Assuming the first image is the one you want
              alt={track.name + " album cover"}
              className="album-cover"
            />
            <span className="track-info">
              {track.name} by {track.artists.map(artist => artist.name).join(", ")}
                - Popularity: {track.popularity}
            </span>
          </li>
        ))}
      </ol>
    </>
  );
}
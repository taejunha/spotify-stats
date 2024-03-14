//import { redirectToAuthCodeFlow } from "../authCodeWithPkce.js";
import React, { useState, useEFfect } from 'react';

export function HomePage() {
    const handleLogin = () => {
        window.location.href = `http://localhost:3000/login`;
    };

    return (
        <>
        <p align="center">
            This is a website that displays a user's most-played tracks and most listened to artists
            from the last month, 6 months, and all time. 
        </p>
        <p align="center">
            Use the tabs above to display either your top tracks or top artists.
        </p>
        <nav>
            <ul>
                <li className="button" onClick={handleLogin} >Login with Spotify</li>
            </ul>
        </nav>
        </>
    )
}
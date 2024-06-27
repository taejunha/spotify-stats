//import { redirectToAuthCodeFlow } from "../authCodeWithPkce.js";
import React, { useState, useEFfect } from 'react';
import "../style/homepage.css"

export function HomePage() {
    return (
        <>
        <p className="info" align="center">
            Discover your most played tracks and favourite artists in the past month, six months, or twelve months!
        </p>
        <button className="login" role="button" >Login with Spotify</button>

        </>
    )
}
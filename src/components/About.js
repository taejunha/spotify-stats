import "../style/homepage.css"
import "../style/about.css"

export function About() {
    const handleLogin = () => {
        window.location.href = `http://localhost:3000/login`;
    };

    return (
        <div className="container">
            <h1 className="title">About Spotify Stats</h1>
            <p className="info" >
                This is a personal project of mine using the Spotify API. Go discover your top fifty tracks and artists that you have been listening to in the past four weeks, six months, or
                past year! It is fun to see some artists or songs that you would not have expected to be on the list. The number on the right represents the popularity score, the higher the number,
                the more common that artist/song is!
            </p>
            <p className="info">
                This website will not store any personal data so don't worry about that! Unfortunately, this only works with Spotify, and does not work with Apple Music.
                This website is also not affiliated with Spotify whatsoever.
            </p>
        </div>
    )
}
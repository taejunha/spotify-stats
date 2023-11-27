import "../style/navbar.css"
import "../style/styles.css"

// navigation bar 
export function Navbar() {
    return (
        <header className="navbar">
            <h1 className="title">Spotify Stats</h1>
            <nav>
                <ul>
                    <li>
                        <a href="/home">Home</a>
                    </li>
                    <li>
                        <a href="/toptracks">Top Tracks</a>
                    </li>
                    <li>
                        <a href="/topartists">Top Artists</a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
import "../style/navbar.css";
import "../style/styles.css";

export function Navbar() {
    return (
        <nav className="header">
            <input type="checkbox" id="check" />
            <label for="check" className="checkbtn">
                <i className="fas fa-bars"></i>
            </label>
            <label className="header-title">Spotify Stats</label>
            <ul>
                <li className="active"><a href="/home">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
        </nav>
    );
}

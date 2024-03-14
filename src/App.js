import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { TopTracks } from "./components/TopTracks";
import { HomePage } from "./components/HomePage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

export default function App() {
    return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/home" element={ <HomePage/> } />
          <Route path="/toptracks" element={ <TopTracks />} />
        </Routes>
        <Footer />
      </Router>
    )
}


import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { MainPage } from "./components/MainPage";
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
          <Route path="/mainpage" element={ <MainPage />} />
        </Routes>
        <Footer />
      </Router>
    )
}


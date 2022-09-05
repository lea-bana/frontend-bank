//import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import "../src/style/main.css";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;

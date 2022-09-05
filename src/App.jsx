import { Routes, Route } from "react-router-dom"
import Footer from "./components/footer";
import Home from "./pages/home";
import "./css/main.css"
import Header from "./components/header";
import SignIn from "./pages/sign-in";
import UserPage from "./pages/user";
import Error from "./pages/error"

function App() {
  return (
    <div className="App">
        < Header />
          <Routes>
            <Route exact path="/" element={<Home />}/>
            <Route path="/argent-bank-app" element={<Home />}/>
            <Route path="/sign-in" element={<SignIn/>}/>
            <Route path="/user" element={<UserPage/>}/>
            <Route path="/*" element={<Error />}/>
          </Routes>
          < Footer />

      </div>
  );
}

export default App;

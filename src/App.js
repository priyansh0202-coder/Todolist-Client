import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginCard from "./components/Login";
import SignupCard from "./components/Signup"
import HomePage from './components/Home'

import './App.css';
import { useSelector } from "react-redux";
import store from "./redux/store";




function App() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginCard />} />
          {isAuthenticated && <Route path="/home" element={<HomePage />} />}
          <Route path="/signup" element={< SignupCard />} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;



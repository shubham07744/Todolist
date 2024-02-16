import Home from './components/Home'
import About from './components/About'
import Navbar  from "./components/Navbar";
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import NoteState from './Context/Notes/NoteState';
import Alert from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';
import { useState } from 'react';
// import './App.css'
function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 2000);
}
  return (
    <>
  <NoteState>
  <BrowserRouter>
    <Navbar/>
    <Alert alert={alert}/>
    <div className="container">
      <Routes>
        <Route exact path="/" element={ <Home showAlert={showAlert}/>}/>
        <Route exact path="/About" element={ <About />}/>
        <Route exact path="/login" element={ <Login showAlert={showAlert}/>}/>
        <Route exact path="/signup" element={ <Signup showAlert={showAlert}/>}/>
      </Routes>
      </div>
    </BrowserRouter>
    </NoteState>
    </>
  );
}

export default App;

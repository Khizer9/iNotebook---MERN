import './App.css';
import {
  BrowserRouter as Router,
  Routes ,
  Route
} from "react-router-dom";
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';
import NoteState from './context/noteState';
import Alert from './components/Alert';

function App() {
  return (
    <>
    <NoteState>
     <Router>
    <Navbar/>
    <Alert message="This is Alert" />
    <div className="container">
    <Routes>
          <Route exact path='/about' element={<About/>} />
          <Route exact path='/' element={<Home/>}/>
        </Routes>
        </div>
    </Router>
    
    </NoteState>
    
    </>
  );
}

export default App;

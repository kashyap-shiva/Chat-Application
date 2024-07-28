import './App.css';
import {Routes , Route , Navigate} from "react-router-dom"
import { Register } from './pages/Register';

function App() {
  return (
    <div className="App">
      <Routes >
        <Route path = "/" element={<Chat />}/>
        <Route path = "/login" element={<Login />}/>
        <Route path = "/register" element={<Register />}/>
      </Routes>
    </div>
  );
}

export default App;

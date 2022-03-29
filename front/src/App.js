import './App.css';
import List from './pages/list/List'
import Login from './pages/login/Login';
import Main from './pages/main/Main';
import Reservation from './pages/reservations/Reservation';
import {Route, Routes} from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Main/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/reservation" element={<Reservation/>}/>
      <Route path="/list" element={<List/>}/>
    </Routes>
  );
}

export default App;

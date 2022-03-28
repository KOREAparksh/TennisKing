import './App.css';
import List from './pages/list/List'
import ListTile from './pages/list/ListTile'
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
      <Route path="/list_tile" element={<ListTile/>}/>
      <Route path="/list" element={<List/>}/>
    </Routes>
  );
}

export default App;

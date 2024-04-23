import { useState } from 'react'
import axios from "axios";
import './App.css';
import {Route, Routes} from "react-router-dom"
import useToken from './components/useToken';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { Agents } from './components/Agents';
import { Login } from './components/Login';
import { Regsiter } from './components/Register';
import { Profile } from './components/Profil';
import { Logout } from './components/LogOut';
import { AgentRegsiter } from './components/AgentRegister';
import { Order } from './components/Oreder';
import { AgentView } from './components/AgentView';
import { Rating } from './components/Rating';
import { ListOfUsers } from './components/ListOfUsers';

function App() {

  const { token, removeToken, setToken } = useToken();

  return (
    <div style={{backgroundImage: 'url("master_background.jpg")',backgroundPosition: "center",backgroundSize: 'cover',backgroundRepeat: "no-repeat"}}>
    <Navbar removToken={removeToken} token={token}/>
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/agents' element={<Agents token={token}/>} />
        <Route path='/agentView' element={<AgentView token={token}/>} />
        <Route path='/login' element={<Login setToken={setToken}/>} />
        <Route path='/regsiter' element={<Regsiter/>} />
        <Route path='/logout' element={<Logout token={removeToken}/>} />
        <Route path='/profil' element={<Profile token={token}/>} />
        <Route path='/agentRegister' element={<AgentRegsiter token={token}/>} />
        <Route path='/order' element={<Order token={token}/>}/>
        <Route path='/rating' element={<Rating token={token}/>}/>
        <Route path='/listofusers' element={<ListOfUsers token={token}/>}/>
      </Routes>
    </div>
    </div>
  );
}

export default App;

import './App.css';
import socket from './componentes/socket';
import { io } from 'socket.io-client';
import React, { useEffect, useState }  from 'react';
import Chat from './componentes/Chat';
import Flights from './componentes/Flights';
import Mapa from './componentes/Mapa'


<head>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
   integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
   crossorigin=""/>


</head>


function App() {
  const [nombre, setNombre] =  useState("");
  const [registrado, setRegistrado] = useState(false);

  const registrar = (e) => {
    e.preventDefault();
    if(nombre !== ""){
      setRegistrado(true);
    }
  }
  return (
    <div className="App">
      {
        !registrado &&
        <form onSubmit = {registrar}>
          <label htmlFor="">Introduzca su nombre de usuario</label>
          <input value={nombre} onChange={e => setNombre(e.target.value)}/>
          <button>Entrar</button>
        </form>
      }
      <div id="superior">
        {
          registrado &&
          <Mapa/>
        }
        {
          registrado &&
          <Chat nombre={nombre}/>
        }
      </div>
      
      <div>
        {
          registrado &&
          <Flights/>
        } 
      </div>
    </div>
  );
}

export default App;

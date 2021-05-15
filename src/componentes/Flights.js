import { render } from '@testing-library/react';
import React, {useEffect, useState} from 'react';
import socket from './socket';


var seteado = 0;

const Flights = () => {

    const [vuelos, setVuelos] = useState([]);

    socket.emit("FLIGHTS");

    const vuelos_cod = [] 

    function guardar(elemento, index){
        if (vuelos_cod.indexOf(elemento.code) === -1){
            vuelos_cod.push(elemento.code);
            vuelos.push(elemento);
        }
        
    }
    useEffect(() => {
        socket.on("FLIGHTS", function(data){
            if (seteado === 0){
                console.log("vuelos");
                console.log(vuelos_cod);
                data.forEach(guardar);
                console.log(vuelos);
                console.log("aaaaaaaa");
                seteado = 1;  
                setVuelos([...vuelos]);
            }
        })

    })
    
    
    
    return( 
        <div className="flights">
            {vuelos.map((e, i) =>
            <ul id="vuelo" key={i}>
                <ul>
                            
                    <p>Aerolinea: <b>{e.airline}</b></p>
                    <p>Codigo: <b>{e.code}</b></p>
                    <p>Avión: <b>{e.plane}</b></p>
                    <p>Capacidad: <b>{e.seats}</b></p>
                    <p>Origen:</p>
                    <p>{e.origin[0]}</p>,<p>{e.origin[1]}</p>
                    <p>Destino:</p>
                    <p>{e.destination[0]}</p>, <p>{e.destination[1]}</p>
                    <b>Pasajeros:</b>
                    {e.passengers.map((pas, i) => (
                        <li>
                            {pas.name}  Edad:{pas.age}
                        </li>
                        
                    ))
                    
                    }
                </ul>  
            </ul>
            )}
        </div>
        
        
        
    )


}

export default Flights;

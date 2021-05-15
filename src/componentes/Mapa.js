import "leaflet/dist/leaflet.css";
import { render } from '@testing-library/react';
import React, {useEffect, useState} from 'react';
import socket from './socket';
import { MapContainer, TileLayer, Marker, Popup, LatLngExpression, CircleMarker, Tooltip} from 'react-leaflet'
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L, { latLng } from 'leaflet';
import { Polyline, SVGOverlay } from "react-leaflet";




<head>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
   integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
   crossorigin=""/>
</head>

let DefaultIcon = L.icon({
    iconUrl: require('./plane.png'),
    iconSize: [25, 25]
});

const planeIcon = new L.icon({
    iconUrl: require('./plane.png'),
    iconSize: [25, 25],
    className: 'leaflet-div-icon'
})

L.Marker.prototype.options.icon = DefaultIcon;


var seteado = 0;

const Mapa = () => {
    const [vuelos, setVuelos] = useState([])
    const [aviones, setAviones] = useState([])
    const [posiciones, setPosiciones] = useState([])
    const vuelos_cod = [] 
    const vuelos_cod2 = []

    var lis_aviones = []
    var dict_aviones = {}

    function guardar(elemento, index){
        if (vuelos_cod.indexOf(elemento.code) === -1){
            vuelos_cod.push(elemento.code);
            vuelos.push(elemento);
            setPosiciones([...posiciones, [elemento.code]])
            console.log(posiciones)
        }
        
    }
    socket.emit("FLIGHTS");
    useEffect(() => {
        socket.on("FLIGHTS", function(data){
            if (seteado === 0){
                data.forEach(guardar);
                seteado = 1;  
                setVuelos([...vuelos]);
            }
        })

    })

    useEffect(() => {
        socket.on("POSITION", function(data){
            if (vuelos_cod2.indexOf(data.code) === -1){
                vuelos_cod2.push(data.code);
                console.log(data.code)
                posiciones.push([data.code])

            }
            lis_aviones = []
            dict_aviones[data.code] = data.position
            for (let key in dict_aviones){
                lis_aviones.push([key, dict_aviones[key][0], dict_aviones[key][1]])
            }
            setAviones(lis_aviones)
            for (let pos = 0; pos<posiciones.length; pos += 1){
                if (posiciones[pos][0] == data.code){
                    posiciones[pos].push([data.position[0], data.position[1]])
                    setPosiciones([...posiciones])
                    console.log(posiciones)
                }
                
            }
            } 
            

                  
        )        
    },[])
    

   
    return(

        <div id="mapa" className='map__container'>
            <MapContainer
            center={[48.864716, 2.349]}
            zoom={2}
            style={{height: "60vh"}}
            >
               
                {  
                    vuelos.map((vuelo,i) => (     
                        <CircleMarker
                        center={[vuelo.origin[0], vuelo.origin[1]]}
                        >
                        </CircleMarker> 
                    ))   
                }
                {  
                    vuelos.map((vuelo,i) => (     
                        <CircleMarker
                        center={[vuelo.destination[0], vuelo.destination[1]]}
                        >
                        </CircleMarker>
                        
                    ))   
                }
                {  
                    vuelos.map((vuelo,i) => (     
                        <Polyline
                        positions={[[vuelo.origin[0], vuelo.origin[1]], [vuelo.destination[0], vuelo.destination[1]]]}
                        />
                    ))   
                }
                {
                    aviones.map((e, i) => (
                   
                        <CircleMarker
                        color={'red'}
                        center={[e[1], e[2]]}
                        radius={5}
                        >
                           <Tooltip direction="top" opacity={1} permanent>{e[0]}</Tooltip>
                        </CircleMarker>
                    ))  
                }
                {
                    lis_aviones.map((e,i) => (
                      <CircleMarker
                        color={'red'}
                        center={[e[1], e[2]]}
                        radius={5}
                      >
                      </CircleMarker>  
                    ))
                }
                {
                    posiciones.map((vuelo, i) => (
                        vuelo.slice(1).map((pos, j) => (
                           
                                <CircleMarker
                                color={'red'}
                                center={[pos[0], pos[1]]}
                                radius={1}
                                >
                                </CircleMarker> 
       
                            
                        ))
                    ))
                }

               

                <TileLayer
                
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

                />
            </MapContainer>
            
        </div>
    )

}

export default Mapa;
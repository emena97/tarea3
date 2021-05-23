import React, {useEffect, useState, useRef} from 'react';
import socket from './socket';
import '../App.css'
var fecha;
const Chat = ({nombre}) =>{

    const [mensaje, setMensaje] = useState("");
    const [mensajes, setMensajes] = useState([]);

    useEffect(() => {
        //aca le cambie mensaje por message
        socket.on("CHAT", function(data) {
            console.log(data.message, data.name, data.date);
            var fecha = Date(data.date);
            data.date = fecha;
            setMensajes([...mensajes, data]);
        })
    }, [mensajes])
    
    const divRef = useRef(null);
    useEffect(() =>{
        divRef.current.scrollIntoView({behavior: 'smooth'})
    })

    //useEffect(() => {
    //    socket.on('POSITION', function(data){
    //       console.log(data.code);
    //    })
    //})

    const submit = (e) =>{
        e.preventDefault();
        console.log('chat enviad0', mensaje);
        socket.emit("CHAT",{"name": nombre, "message": mensaje} )
    }

    return(
        <div className="chat_general">
            <div className="chat">
                {mensajes.map((e, i) => <div key={i}><div>{e.date}</div>{e.name}: {e.message}</div>)}
                <div ref={divRef}></div>
            </div>

                <form onSubmit={submit}>
                    <div>
                        <textarea name="" id="txt" value={mensaje} onChange={e => setMensaje(e.target.value)}>
                        </textarea>
                    </div>
                    <div id="btn_msg">
                        <label htmlFor="" id="label_msg">Envie su Mensaje</label>
                        <button id="btn_send">Enviar</button>
                    </div>
                    
                    
                    
                </form>
        </div>
        

    );
}


export default Chat;
import { useState } from 'react';
import { useEffect } from 'react';
import { FaCheck } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { getNameHash } from '../util/nameHash';


const Connection = ({ socket }) => {

    const { id } = useParams()
    const name = getNameHash(id)
    const [ackedName, setAckedName] = useState(null)

    useEffect(() => {

        if (!socket) return

        socket.emit('joinRoom', { room: id, device: "MOBILE" });

        socket.on("deviceConnected", (data) => {

            if (data.device === "PCI"){
                console.log("PCI CONNECTED: ", data.parts);
                setAckedName(name)
            }            
        })

        socket.on("deviceDisconnected", (data) => {
            
            if (data.device === "PCI"){
                console.log("PCI DISCONNECTED: ", data.parts);
                setAckedName(null)
            }   
        })

    }, [id, socket, name])
    
 
    const codeMessageStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: "20vh",
        left: "5vw",
        width: "calc(90vw - 4rem)",
        borderRadius: "1rem",
        padding: "1rem 2rem"
    }

    const textStyle = {
        marginRight: "10px"
    }

    return (
        <>
        {ackedName === name && 
            <div style={codeMessageStyle}>
                <p style={textStyle}> Koblet til: {name} </p>
                <FaCheck size="1rem" color="green" />
            </div>}
        </>
    )
}

export default Connection


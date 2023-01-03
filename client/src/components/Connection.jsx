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

        socket.on("mobileAck", (data) => {
            console.log("SETTING MOBILE ACK!: ", data);
            setAckedName(data.name)
        })

        socket.emit('joinRoom', id);
        socket.emit("mobileClientConnectionEstablished", { connectionName: name, room: id })

        console.log("SENDING MOBILE CLIENT ESTABLISHED!");

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


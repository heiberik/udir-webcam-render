import { useState } from 'react';
import { useEffect } from 'react';
import { FaCheck } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { getNameHash } from '../util/nameHash';


const Connection = ({ socket }) => {

    const { id } = useParams()
    const name = getNameHash(id)
    const [ackedName, setAckedName] = useState(null)
    const [check, setCheck] = useState("")

    useEffect(() => {

        if (!socket || !id) return

        const idName = getNameHash(id)

        socket.emit('joinRoom', { room: id, device: "MOBILE" });
        socket.on("sendRoomParticipants", (data) => {
            const connection = data.parts.includes("PCI") && data.parts.includes("MOBILE")
            setAckedName(connection ? idName : null)

            setCheck(c => c.includes("+") ? data.parts + " - " : data.parts + " + ")
        })

    }, [id, socket])


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

    if (ackedName === name) return (
        <div style={codeMessageStyle}>
            <p style={textStyle}> Koblet til: {name} </p>
            <FaCheck size="1rem" color="green" />
            <p> {check} </p>
        </div>
    )
    else return (
        <div style={codeMessageStyle}>
            <p style={textStyle}> Ikke tilkoblet kandidat </p>
            <p> {check} </p>
        </div>
    )
}

export default Connection


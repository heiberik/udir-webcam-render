import { useState } from 'react';
import { useEffect } from 'react';
import { FaCheck } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { getNameHash } from '../util/nameHash';


const Connection = ({ socket, setMessage }) => {

    const { id } = useParams()
    const name = getNameHash(id)
    const [ackedName, setAckedName] = useState(null)

    useEffect(() => {

        if (!socket || !id) return

        const idName = getNameHash(id)

        socket.emit('joinRoom', { room: id, device: "MOBILE" });
        socket.on("sendRoomParticipants", (data) => {
            const connection = data.parts.includes("PCI") && data.parts.includes("MOBILE")
            setAckedName(connection ? idName : null)
        })

    }, [id, socket])

    useEffect(() => {

        if (!socket || !id) return

        const handleVisibilityChange = () => {

            if (document.visibilityState === "hidden"){
                socket.emit('leaveRoom');
            }
            else {
                if (id) {
                    if (!socket.connected) socket.connect()
                    socket.emit('joinRoom', { room: id, device: "MOBILE" });
                    setMessage("JOINED ROOM: ", id)
                }
                else {
                    setMessage("DID NOT JOIN ROOM :D")
                }
            }
        }

        document.addEventListener("visibilitychange", handleVisibilityChange);
        window.addEventListener("pagehide", handleVisibilityChange)

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange)
            window.removeEventListener("pagehide", handleVisibilityChange)
        }

    }, [id, socket, setMessage])


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
        </div>
    )
    else return (
        <div style={codeMessageStyle}>
            <p style={textStyle}> Ikke tilkoblet kandidat </p>
        </div>
    )
}

export default Connection


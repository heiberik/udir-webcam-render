import { useState } from 'react';
import { useEffect } from 'react';
import { FaCheck } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { getNameHash } from '../util/nameHash';


const Connection = ({ socket, setMessage }) => {

    const { id } = useParams()
    const name = getNameHash(id)
    const [ackedName, setAckedName] = useState(null)
    const [savedId, setSavedId] = useState(null)

    useEffect(() => {

        if (!socket || !id || id.trim() === "") return

        const idName = getNameHash(id)
        setSavedId(id)

        socket.emit('joinRoom', { room: id, device: "MOBILE" });
        socket.on("sendRoomParticipants", (data) => {
            const connection = data.parts.includes("PCI") && data.parts.includes("MOBILE")
            setAckedName(connection ? idName : null)
        })

    }, [id, socket])

    useEffect(() => {

        if (!socket || !savedId) return

        const handleVisibilityChange = () => {

            if (document.visibilityState === "hidden"){
                socket.emit('leaveRoom');
            }
            else {
                if (savedId) {
                    if (!socket.connected) socket.connect()
                    socket.emit('joinRoom', { room: savedId, device: "MOBILE" });
                    setMessage("JOINED ROOM: ", savedId)
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

    }, [savedId, socket, setMessage])


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


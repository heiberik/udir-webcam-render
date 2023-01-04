import { useNavigate } from "react-router-dom"
import { QrReader } from 'react-qr-reader'
import { getNameHash } from '../util/nameHash'
import { useEffect } from "react";

const QRPage = ({ setMessage, setCodeMessage, socket }) => {

    const navigate = useNavigate();

    useEffect(() => {
        if (socket) socket.disconnect()
    }, [])

    const stopButtonStyle = {
        position: "absolute",
        top: "1rem",
        right: "1rem",
        zIndex: "99999",
        padding: "1rem 1.5rem",
        borderRadius: "666rem",
        border: "solid 1px lightgreen",
        backgroundColor: "lightgreen"
    }

    const qrContainer = {
        backgroundColor: "lightgreen",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw"
    }

    const videoStyle = {
        width: "100vw",
        height: "100vh",
        objectFit: "cover",
        position: "absolute"
    }

    const qrTextStyle = {
        zIndex: "99999",
        position: "absolute",
        bottom: "10%",
        backgroundColor: "lightgreen",
        padding: "1rem",
        borderRadius: "1rem",
        width: "100vw",
        textAlign: "center"
    }

    const handleScan = (data) => {

        if (data) {

            const url = data.text
            const split = url.split("/")
            const id = split[split.length - 1]

            if (socket) socket.connect()
            navigate("/" + id)
            setMessage("Du kan nå legge til bilder.")
        }
    }

    return (
        <div style={qrContainer}>
            <button style={stopButtonStyle} onClick={() => { navigate(-1) }}> Tilbake </button>
            <p style={qrTextStyle}> Scan QR-koden.</p>
            <QrReader
                containerStyle={qrContainer}
                videoContainerStyle={qrContainer}
                onResult={(data) => handleScan(data)}
                videoStyle={videoStyle}
                constraints={{ facingMode: 'environment' }} />
        </div>
    )
}

export default QRPage

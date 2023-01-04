import { useParams } from 'react-router-dom'
import { Camera as CameraWidget, FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo'
import 'react-html5-camera-photo/build/css/index.css'
import { useEffect } from 'react'


const Camera = ({ setCamActive, socket, setMessage }) => {

    const { id } = useParams()

    useEffect(() => {
        setMessage(null)
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

    const handleTakePhoto = (dataUri) => {

        socket.emit("sendData", { image: dataUri, room: id })
        setCamActive(false)

        if (!dataUri) window.alert("Bildet ble ikke sendt.")
        if (dataUri) setMessage("Bildet ble sendt til kandidat.")
    }

    const handleCamError = (err) => {
        window.alert("err", err)
    }

    return (
        <>
            <button style={stopButtonStyle} onClick={() => { setCamActive(false) }}> Tilbake </button>
            <CameraWidget
                isFullscreen={true}
                idealFacingMode={FACING_MODES.ENVIRONMENT}
                imageCompression={0.4}
                imageType={IMAGE_TYPES.JPG}
                isMaxResolution={true}
                onTakePhoto={(dataUri) => { handleTakePhoto(dataUri); }}
                onCameraError={(err) => { handleCamError(err) }}
            />
        </>
    )
}

export default Camera
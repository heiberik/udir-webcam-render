import { useNavigate } from "react-router-dom"

const Buttons = ({ camActive, setCamActive }) => {

    const navigate = useNavigate()

    const buttonStyle = {
        padding: "1rem 2rem",
        borderRadius: "1rem",
        border: "solid 2px lightgreen",
        backgroundColor: "lightgreen",
        fontSize: "1.5rem",
        width: "80vw",
        margin: "1rem",
        height: "fit-content"
    }

    const buttonNewCandStyle = {
        padding: "1rem 2rem",
        borderRadius: "1rem",
        border: "solid 2px lightgreen",
        backgroundColor: "ghostwhite",
        fontSize: "1.5rem",
        width: "80vw",
        margin: "1rem",
        height: "fit-content"
    }

    const containerStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column"
    }

    return (
        <div style={containerStyle}>
            <button style={buttonStyle} onClick={() => { setCamActive(true) }}> Legg til nytt bilde </button>
            <button style={buttonNewCandStyle} onClick={() => { navigate("/qr") }}> Skan ny QR-kode </button>
        </div>
    )
}

export default Buttons


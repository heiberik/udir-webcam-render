import { useEffect } from "react"
import { FaCheck } from 'react-icons/fa';


const Message = ({ message, setMessage, codeMesage }) => {

    useEffect(() => {
        setTimeout(() => {
            setMessage(null)
        }, 10000)
    }, [])

    const containerStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: "5vw",
        left: "5vw",
        width: "calc(90vw - 4rem)",
        backgroundColor: "lightgreen",
        borderRadius: "1rem",
        padding: "1rem 2rem"
    }
    const codeMessageStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: "30vw",
        left: "5vw",
        width: "calc(90vw - 4rem)",
        backgroundColor: "lightgreen",
        borderRadius: "1rem",
        padding: "1rem 2rem"
    }

    const textStyle = {
        marginLeft: "1rem"
    }

    return (
        <>
            {message && <div style={codeMesage ? codeMessageStyle : containerStyle}>
                <FaCheck size="2rem" color="green" />
                <p style={textStyle}> {message} </p>
            </div>}
        </>
    )
}

export default Message


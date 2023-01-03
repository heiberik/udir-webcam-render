import { useState } from "react"
import Buttons from "../components/Buttons"
import Camera from "../components/Camera"
import Connection from "../components/Connection"

const CamPage = ({ socket, setMessage, codeMessage }) => {

    const [camActive, setCamActive] = useState(false)

    return (
        <>
            {camActive ?
                <Camera
                    setCamActive={setCamActive}
                    socket={socket}
                    setMessage={setMessage}
                />
                :
                <>
                    <Buttons
                        setCamActive={setCamActive}
                    />
                    <Connection codeMessage={codeMessage} socket={socket} />

                </>
            }

        </>
    )
}

export default CamPage
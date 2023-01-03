import { useState } from "react"
import Buttons from "../components/Buttons"
import Camera from "../components/Camera"

import Message from "../components/Message"
const CamPage = ({ socket, setMessage, setCodeMessage, codeMessage }) => {

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
                    <Message message={codeMessage} setMessage={setCodeMessage} codeMesage={true} />
                    <Buttons
                        setCamActive={setCamActive}
                    />
                </>
            }

        </>
    )
}

export default CamPage
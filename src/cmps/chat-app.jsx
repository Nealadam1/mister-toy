import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EMIT_SET_TOPIC, SOCKET_EVENT_ADD_MSG } from "../services/socket.service";

export function ChatApp({toy, onAddToyMsg}) {
    const [msg, setMsg] = useState({ txt: '' })
    const [topic, setTopic] = useState(toy._id)
    const [msgs, setMsgs] = useState(toy.msgs || [])

    console.log( msgs)

    const loggedInUser = useSelector(storeState => storeState.userModule.user)

    useEffect(() => {
        socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)
        return () => {
            socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
        }
    }, [])

    useEffect(() => {
        socketService.emit(SOCKET_EMIT_SET_TOPIC, topic)
    }, [topic])

    function addMsg(newMsg) {
        setMsgs(prevMsgs => [...prevMsgs, newMsg])
    }

    function sendMsg(ev) {
        ev.preventDefault()
        const from = loggedInUser?.fullname || 'Me'
        const newMsg = { from, txt: msg.txt }
        socketService.emit(SOCKET_EMIT_SEND_MSG, newMsg)
        // addMsg(newMsg)
        setMsg({ txt: '' })
        onAddToyMsg(newMsg)
        
    }

    function handleFormChange(ev) {
        const { name, value } = ev.target
        setMsg(prevMsg => ({ ...prevMsg, [name]: value }))
    }

    return (
        <section className="chat-app">
            Chat about this Toy
            <form onSubmit={sendMsg}>
                <input
                    type="text"
                    name="txt"
                    value={msg.txt}
                    onChange={handleFormChange}
                    autoComplete="off" />
                <button>Send</button>
            </form>

            <ul>
                {msgs.map((msg,idx)=>(<li key={idx}>{msg.from}: {msg.txt} </li>))}
            </ul>
        </section>

    )


}
import React, {useEffect, useState} from 'react';
import axios from "axios";

const EventSourcing = () => {
    const [messages, setMessages] = useState([])
    const [value, setValue] = useState('')

    useEffect(() => {
        subscribe()
    }, [])

    const subscribe = async () => {
        const eventSource = new EventSource('http://localhost:5000/connect')
        eventSource.onmessage = (event) => {
            const msg = JSON.parse(event.data)
            setMessages(prev => [msg, ...prev])
        }
    }

    const sendMessage = async (message) => {
        await axios.post('http://localhost:5000/new-message', {
            message: value,
            id: Date.now()
        })
    }


    return (
        <div className="center">
            <div>
                <div className="form">
                    <input
                        onChange={(e) => setValue(e.target.value)}
                        value={value}
                        type="text"
                    />
                    <button onClick={sendMessage}>Отправить</button>
                </div>
                <div className="messages">
                    {messages.map(msg =>
                        <div
                            key={msg.id}
                            className='message'
                        >
                            {msg.message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventSourcing;
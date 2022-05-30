import React, {useEffect, useState} from 'react';
import axios from "axios";

const LongPolling = () => {
    const [messages, setMessages] = useState([])
    const [value, setValue] = useState('')

    useEffect(() => {
        subscribe()
    }, [])

    const subscribe = async () => {
        try {
            const {data} = await axios.get('http://localhost:5000/get-messages')
            setMessages(prevState => [data, ...prevState])
            await subscribe()
        } catch (e) {
            console.log(e)
            setTimeout(() => {
                subscribe()
            }, 500)
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

export default LongPolling;
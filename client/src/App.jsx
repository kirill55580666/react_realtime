import React from 'react';
import LongPolling from "./LongPolling";
import './App.css'
import EventSourcing from "./EventSourcing";
import WebSock from "./WebSock";

const App = () => {
    return (
        <div>
            <WebSock/>
        </div>
    );
};

export default App;
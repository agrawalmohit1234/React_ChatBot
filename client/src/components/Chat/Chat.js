import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

const ENDPOINT = 'localhost:5000';

let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT);

        setRoom(room);
        setName(name)

        socket.emit('join', { name, room }, (error) => {
            if (error) {
                alert(error);
            }
        });
        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [ENDPOINT, location.search]);

    return (
        <React.Fragment>
            <h1>{room}</h1>
            <h1>{name}</h1>
        </React.Fragment>
    )

}

export default Chat;
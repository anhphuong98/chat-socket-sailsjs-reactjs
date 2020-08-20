import React, { useState, useEffect } from 'react';
import './App.css';
import { TextField, Container, Typography, Fab } from '@material-ui/core';
import NavigationIcon from '@material-ui/icons/Navigation';
import axios from 'axios';

let socketIOClient = require('socket.io-client');
let sailsIOClient = require('sails.io.js');

let io = sailsIOClient(socketIOClient);
io.sails.url = "http://localhost:1337";

function App() {
    const [text, setText] = useState('');
    const [messages, setMessages] = useState([]);
    const [time, setTime] = useState(1);

    const sendMessage = () => {
        axios.post('http://localhost:1337/send-message', { text }).then(function (res) {
        })
    }
    const test = async () => {
        console.log("Aaaaa");
        io.socket.get('/sub-chat', function serverResponsed(body, JWR) {
            io.socket.on('message', function (message) {
                messages.push(message);
                setMessages([...messages]);
            })
        });
        return () => {
            io.socket.disconnect();
        }
    }
    useEffect(() => {
        io.socket.get('/sub-chat', function serverResponsed(body, JWR) {
            io.socket.on('message', function (message) {
                messages.push(message);
                setMessages([...messages]);
            })
        });
        return () => {
            io.socket.disconnect();
        }

    }, []);
    return (
        <div className="App">
            <div className="box-chat" style={{ marginTop: "3rem" }}>
                <Container maxWidth="sm">
                    <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '200px' }}>
                        <ul>
                            {
                                messages.map((message, index) => <li key={index}>{message}</li>)
                            }
                        </ul>
                    </Typography>
                </Container>
            </div>
            <div className="input-chat" style={{ marginTop: "1rem" }}>
                <form className="form-chat">
                    <TextField onChange={(e) => setText(e.target.value)} size="small" id="outlined-basic" label="Nhập nội dung" variant="outlined" />
                    <Fab size="small" variant="extended" color="primary" onClick={sendMessage}>
                        <NavigationIcon />
                        Send
                    </Fab>
                </form>
            </div>
        </div >

    );
}

export default App;

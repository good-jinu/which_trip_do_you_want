import React, { useState } from 'react';
import axios from 'axios';
import './ChatBot.css';

function ChatBot(props) {
    const [reqval, setReqval] = useState('');
    const [chatlog, setChatlog] = useState([]);

    function handleChange(e) {
        setReqval(e.target.value);
    }

    function handleKeyPress(e){
        if(e.key === 'Enter'){
            handleSubmit();
        }
    }
    
    function handleSubmit() {
        setChatlog([...chatlog, reqval]);
        setReqval('');
        axios({
            method:'post',
            url:'/req',
            data: reqval,
            headers: {
                'Content-Type': 'text/plain'
            }
        })
        .then(res => {
            setChatlog([...chatlog, res.data]);
        })
        .catch(err => {
            console.error(err);
        });
    }
    
    return (
        <article className="chatbot">
            <ul className="chatScreen">
                {chatlog.map(item => (
                    <li>{item}</li>
                ))}
            </ul>
            <div className="textInputBox">
                <div>
                    <input type="text" value={reqval} onChange={handleChange} onKeyPress={handleKeyPress}/>
                </div>
            </div>
        </article>
    );
}

export default ChatBot;
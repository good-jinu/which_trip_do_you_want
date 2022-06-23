import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChatBot.css';
import {isMobile} from 'jslib/device_detector';

function ChatBot(props) {
    const [reqval, setReqval] = useState('');
    const [chatlog, setChatlog] = useState([]);
    const [is_random, setIsRandom] = useState(false);

    let navermapurl;

    if(isMobile()) {
        navermapurl = "https://m.map.naver.com/search2/search.naver?query=";
    } else {
        navermapurl = "https://map.naver.com/v5/search/";
    }

    useEffect(() => {
            let ele = document.getElementsByClassName('chatScreen')[0];
            ele.scrollTop = ele.scrollHeight;
    }, [chatlog]);

    function convertRandomBtn(e) {
        if(is_random) {
            e.target.src = "/noshuffle.png";
            setIsRandom(false);
        } else {
            e.target.src = "/shuffle.png";
            setIsRandom(true);
        }
    }

    function handleKeyPress(e){
        if(e.key === 'Enter'){
            handleSubmit();
        }
    }
    
    function handleSubmit() {
        let tmplog = chatlog;
        let qagroup = [reqval];
        let requrl = '/req';
        if (is_random) {
            requrl = '/req_r';
        }
        setReqval('');
        if(reqval === "clear") {
            setChatlog([]);
        } else if (reqval === "contributor") {
            qagroup.push(['이진우','이승영','정경희','김병수','정지성']);
            setChatlog([...tmplog,qagroup]);
        } else {
            axios({
                method:'post',
                url: requrl,
                data: reqval,
                headers: {
                    'Content-Type': 'text/plain'
                }
            })
            .then(res => {
                qagroup.push(res.data);
                setChatlog([...tmplog,qagroup]);
            })
            .catch(err => {
                setChatlog(tmplog);
                console.error(err);
            });
        }
    }
    
    return (
        <article className="chatbot">
            <div className="chatwrapper">
            <div className="chatScreen">
                {chatlog.map((item, index) => {
                    let a = item[0];
                    let b = [];
                    for (let i=0; i<item[1].length; i++)
                    {
                        b.push(item[1][i]);
                    }
                    return (
                        <div>
                            <div key={"onequery"+index} className="user_comment">
                                {a}
                            </div>
                            <div className="bot_comment">
                                {b.map((item2, index2) => {
                                    let spl = item2.split(', ');
                                    if(spl.length === 1) {
                                        return (
                                            <p key = {"mulans"+index2}>{item2}</p>
                                        );
                                    }
                                    return (
                                    <a href={navermapurl+encodeURIComponent(item2)}
                                    target="_blank" rel="noopener noreferrer">
                                        <p key={"mulans"+index2}>{item2}</p>
                                    </a>
                                    );
                                    }
                                )
                                }
                            </div>
                        </div>
                        );
                })}
            </div>
            </div>
            <div className="textInputBox">
                <img className="random_btn" onClick={convertRandomBtn} src="/noshuffle.png" alt="random"/>
                <input type="text" value={reqval} onChange={(e) => {setReqval(e.target.value);}} onKeyPress={handleKeyPress}/>
            </div>
        </article>
    );
}

export default ChatBot;
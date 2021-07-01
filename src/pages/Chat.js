import React, {useEffect, useState, useContext} from 'react'
import { useHistory } from "react-router-dom"
import { createRenderer } from 'react-dom/test-utils'
import GameContext from '../context/GameContext'
import CardComponent from '../componentes/CardComponent'
import { Card, suits } from '../componentes/cards'
import Player from '../componentes/players'
import '../style/chat.css'

class Message {
    constructor(sender, score, text) {
        this.sender = sender
        this.score = score
        this.text = text
        this.timestamp = Date.now()
    }
}

const Chat = () => {
    const history = useHistory()

    const {playerName, setPlayerName, players, setPlayers, isFindingGame, setIsFindingGame} = useContext(GameContext)
    const [messages, setMessages] = useState([])
    const [currentMessage, setCurrentMessage] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (players[1] === undefined) {
            history.push(`/`)
        }
    }, [])

    const sendMessage = e => {
        e.preventDefault()
        let score = 0
        if (players!==undefined) {
            //console.log('players not undefined')
            if (playerName == players[0].name) {
                score = players[0].score
            } else {
                score = players[1].score
            }
        }
        let message = new Message(playerName, score, currentMessage)
        setMessages([...messages, message])
        setCurrentMessage('')
    }

    const convertToCSV = objArray => {
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray
        var str = 'playerName, score, messageBody, messageTimestamp, playerScore\r\n'

        for (var i = 0; i < array.length; i++) {
            var line = ''
            for (var index in array[i]) {
                if (line != '') line += ','

                line += array[i][index]
            }

            str += line + '\r\n'
        }

        return str
    }

    const messageChange = e => {
        e.preventDefault()
        setCurrentMessage(e.target.value)
    }

    const sendChatData = async () => {
        const url = `${process.env.PUBLIC_URL}/e.c.stanton/studies/GinRummy/ginrummy.php`
        const rawResponse = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({results2send: convertToCSV(messages)})
    })
    }

    useEffect(() => {
        var minute = 2;
        var sec = 0;
        let timer = setInterval(() => {
            if (minute==0 && sec==0) {
                sendChatData()
                history.push("/play")
                clearInterval(timer)
            } else {
                document.getElementById("timer").innerHTML = `Round starting in ${minute} minutes and ${sec} seconds`
                sec--
                if (sec < 0) {
                    minute --
                    sec = 59;
                }

                if (sec % 10 == 0) {
                    let score = 0
                    if (players!==undefined) {
                        score = players[1].score
                    }
                    let message = new Message('Fake User', score, 'Fake user message')
                    setMessages(currentMessages => [...currentMessages, message])
                }
            }
        }, 1000)
    }, [])

    return (
        <GameContext.Provider value={{playerName}}>
        <div className="Chat">
            <h1>Online Gin-Rummy</h1>
            <h2>Chat</h2>
            <h2 id="timer">...</h2>

            <div className="message-area">
                <ul>
                    {messages.map(message => {
                        return (
                            <div className={`message ${message.sender===playerName ? 'ownMessage' : ''}`}>
                                <h3>{message.sender}</h3>
                                <p>{message.text}</p>
                            </div>
                        )
                    })}
                </ul>
                <div className="spacer"></div>
                <form onSubmit={e => sendMessage(e)}>
                    <textarea type="text" name="message" id="message-box" placeholder="Message" value={currentMessage} onChange={e => messageChange(e)}/>
                    <input type="submit" value="Send" disabled={currentMessage===''}/>
                </form>
            </div>

        </div>
        </GameContext.Provider>
    )
}

export default Chat
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

    const {gameState, _setGameState, prevGameState, setPrevGameState, playerName, setPlayerName, players, setPlayers, isFindingGame, setIsFindingGame, roundsPlayed, setRoundsPlayed} = useContext(GameContext)
    const [messages, setMessages] = useState([])
    const [currentMessage, setCurrentMessage] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [userMessagesCount, setUserMessagesCount] = useState(0)
    const [chatLogPhpLink, setChatLogPhpLink] = useState('#')

    let context = useContext(GameContext)
    useEffect(() => {
        console.log('context', context)
    })

    useEffect(() => {
        if (players[1] === undefined) {
            history.push(`/`)
        }
    }, [])

    useEffect(() => {
        fetch(`${process.env.PUBLIC_URL}/links.json`, {mode: 'cors'})
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setChatLogPhpLink(data.chatLogPHPLink)
        })
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
        setUserMessagesCount(userMessagesCount+1)
    }

    const onEnterPress = e => {
        if (e.keyCode === 13) {
            sendMessage(e)
        }
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
        const url = chatLogPhpLink
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

    // useEffect(() => {
    //     var minute = 2
    //     var sec = 0
    //     let timer = setInterval(() => {
    //         if (minute==0 && sec==0) {
    //             sendChatData()
    //             history.push("/play")
    //             clearInterval(timer)
    //         } else {
    //             document.getElementById("timer").innerHTML = `Round starting in ${minute} minutes and ${sec} seconds`
    //             sec--
    //             if (sec < 0) {
    //                 minute --
    //                 sec = 59
    //             }
    //         }
    //     }, 1000)
    // }, [])

    // first message from 'Jack'
    useEffect(() => {
        let score = 0
        
        if (players!==undefined) {
            score = players[1].score
        }
        let messageText = 
            roundsPlayed==0 
                ? 'Hi, I am Jack; nice to meet you. Do you know this game?' //before round 1
                : (roundsPlayed==1 
                    ? 'You did well! It wasn’t too difficult was it?' //after round 1
                    : 'Thanks! It was fun playing with you.') //end of game
        let message = new Message(players[1].name, score, messageText)
        setTimeout(() => {
            setMessages(currentMessages => [...currentMessages, message])
            //show end screen if 2 rounds played
            if (roundsPlayed === 2) {
                setTimeout(() => {
                    history.push('/end')
                }, 5000)
            }
        }, 4500)
    }, [])

    //second message after player responds
    useEffect(() => {
        let score = 0
        if (userMessagesCount === 1) {
            if (players!==undefined) {
                score = players[1].score
            }
            let messageText = 
            roundsPlayed==0 
                ? 'I’m quite excited about the game. I’ve been playing card games with friends online, but never as part of a study. What do you think about it?' //before round 1
                : 'Btw, I’ve been playing this game a lot and you know what I noticed, girls are usually worse players. Let me tell you a good joke about it:  Why couldn\'t the blonde write the number eleven? She didn\'t know which “1” came first :) You know what I mean ;)' //after round 1
            let message = new Message(players[1].name, score, messageText)
            setTimeout(() => {
                setMessages(currentMessages => [...currentMessages, message])
                //show second message from Jack if after round 1
                if (roundsPlayed == 1) {
                    let message = new Message(players[1].name, score, 'What do you think?')
                    setTimeout(() => {
                        setMessages(currentMessages => [...currentMessages, message])
                    }, 1000)
                }
            }, 10000)
        }
        if (userMessagesCount >= 2 && roundsPlayed !== 2) {
            setTimeout(() => {
                document.getElementById("timer").innerHTML = `Get ready! Round ${roundsPlayed+1} will start in 10 seconds`
                document.getElementById("message-box").disabled = true
                if (roundsPlayed == 0) {
                    if (players!==undefined) {
                        score = players[1].score
                    }
                    let message = new Message(players[1].name, score, 'Good luck :)')
                    setMessages(currentMessages => [...currentMessages, message])
                }
            }, 3500)
            setTimeout(() => {
                history.push('/play')
            }, 10000)
        }
    }, [userMessagesCount])

    const winningText = () => {
        let result
        const roundWinner = players[(players[0].scores[players[0].scores.length - 1] > players[1].scores[players[1].scores.length - 1]) ? 0 : 1].name
        const gameWinner = players[(players[0].score > players[1].score) ? 0 : 1].name
        if (players[0].score === players[1].score) {
            result = `This is the end of Round ${roundsPlayed}.  The winner is ${roundWinner}. Overall, its a tie!`
        } else {
            result = `This is the end of Round ${roundsPlayed}.  The winner is ${roundWinner}.  Overall, the winner is ${gameWinner}!`
        }
        return result
    }

    const helpterText = r => {
        switch(r) {
            case 0:
                return 'You will have an opportunity to meet your opponent now. You can chat with each other before the game starts.'
            default:
                return winningText()
        }
    }

    return (
        <GameContext.Provider value={{playerName}}>
        <div className="Chat">
            <h1>Online Gin-Rummy</h1>
            <h3>{helpterText(roundsPlayed)}</h3>
            <h2 id="timer">Game will begin shortly</h2>

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
                    <textarea type="text" name="message" id="message-box" placeholder="Message" 
                        value={currentMessage} onChange={e => messageChange(e)} onKeyDown={onEnterPress}/>
                    <input type="submit" value="Send" disabled={currentMessage===''}/>
                </form>
            </div>

        </div>
        </GameContext.Provider>
    )
}

export default Chat
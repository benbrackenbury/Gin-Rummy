import React, {useEffect, useState, useContext} from 'react'
import { useHistory } from "react-router-dom"
import { createRenderer } from 'react-dom/test-utils'
import GameContext from '../context/GameContext'
import CardComponent from '../componentes/CardComponent'
import { Card, suits } from '../componentes/cards'
import Player from '../componentes/players'
import '../style/lobby.css'

let players = []

const Lobby = () => {
    const history = useHistory()

    const {playerName, setPlayerName, players, setPlayers, isFindingGame, setIsFindingGame} = useContext(GameContext)
    const [prolificID, setProlificID] = useState('')

    const findGame = e => {
        e.preventDefault()
        setPlayerName(playerName)
        setPlayers([
            new Player(playerName, prolificID),
            new Player('Jack')
        ])
        setIsFindingGame(true)

        const sleepInterval = Math.floor(Math.random() * 1)*1000
        setTimeout(() => {
            history.push("/chat")
        }, sleepInterval)
    }

    return (
        <div className="Lobby">
            <h1>Online Gin-Rummy</h1>

            
            {isFindingGame ? (
                <h2 className="loading">Searching...</h2>
            ) : (
                <form onSubmit={e => findGame(e)} className="nameForm">
                    <label htmlFor="name">Enter your name</label>
                    <input type="text" name="name" id="nameField" placeholder="Name" value={playerName} onChange={e => {setPlayerName(e.target.value)}}/>
                    <label htmlFor="name">Enter your Prolific ID</label>
                    <input type="text" name="id" id="idField" placeholder="Prolific ID" value={prolificID} onChange={e => {setProlificID(e.target.value)}}/>
                    <input type="submit" value="Find Game"/>
                </form>
            )}

        </div>
    )
}

export default Lobby
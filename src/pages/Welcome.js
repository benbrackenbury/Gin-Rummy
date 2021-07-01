import React, {useEffect, useState, useContext} from 'react'
import { useHistory } from "react-router-dom"
import { createRenderer } from 'react-dom/test-utils'
import GameContext from '../context/GameContext'
import CardComponent from '../componentes/CardComponent'
import { Card, suits } from '../componentes/cards'
import Player from '../componentes/players'
import '../style/welcome.css'

const Welcome = () => {
    const history = useHistory()

    const {playerName, setPlayerName, players, setPlayers, isFindingGame, setIsFindingGame} = useContext(GameContext)

    const next = e => {
        e.preventDefault()
        history.push("/rules")
    }

    return (
        <div className="Welcome">
            <h1>Online Gin-Rummy</h1>

            <main>
                <h2>Welcome to …. Gin Rummy!</h2>
                <p>
                You will play two rounds of Gin Rummy game with another player. 
                You will also have an opportunity to chat with the other player. 
                At the end of the game, you will receive a link to a short survey 
                and we will ask you to evaluate the other player.
                </p>
            </main>

            <button onClick={next}>Continue</button>

        </div>
    )
}

export default Welcome
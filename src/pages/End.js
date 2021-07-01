import React, {useEffect, useState, useContext} from 'react'
import { useHistory } from "react-router-dom"
import { createRenderer } from 'react-dom/test-utils'
import GameContext from '../context/GameContext'
import CardComponent from '../componentes/CardComponent'
import { Card, suits } from '../componentes/cards'
import Player from '../componentes/players'
import '../style/end.css'

const End = () => {

    return (
        <div className="End">
            <h1>Online Gin-Rummy</h1>

            <main>
                <h2>Thank you for playing</h2>
                <p>
                    Please click on the link below to evaluate the other player
                </p>
                <a href="#">Survey</a>
            </main>

        </div>
    )
}

export default End
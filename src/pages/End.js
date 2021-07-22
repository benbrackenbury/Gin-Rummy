import React, {useEffect, useState, useContext} from 'react'
import { useHistory } from "react-router-dom"
import { createRenderer } from 'react-dom/test-utils'
import GameContext from '../context/GameContext'
import CardComponent from '../componentes/CardComponent'
import { Card, suits } from '../componentes/cards'
import Player from '../componentes/players'

const End = () => {
    
    const [surveyLink, setSurveyLink] = useState('#')

    useEffect(() => {
        fetch(`${process.env.PUBLIC_URL}/links.json`, {mode: 'cors'})
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setSurveyLink(data.survey)
        })
    }, [])

    return (
        <div className="End">
            <h1>Online Gin-Rummy</h1>

            <main>
                <h2>Thank you for playing</h2>
                <p>
                    Please click on the link below to evaluate the other player
                </p>
                <a href={surveyLink}>Survey</a>
            </main>

        </div>
    )
}

export default End
import React, {useEffect, useState, useContext} from 'react'
import { useHistory } from "react-router-dom"
import GameContext from '../context/GameContext'
import '../style/card.css'

const CardComponent = ({card, isFaceUp, player, isKnock=false, pile}) => {
    const history = useHistory()

    const [isFaceUpState, setIsFaceUpSate] = useState(false)
    const {discardPile, setDiscardPile, deck, setDeck, gameState, setGameState, currentCard, setCurrentCard, players, setPlayers} = useContext(GameContext)

    useEffect(() => {
        setIsFaceUpSate(isFaceUp)
    }, [])

    const mapToPNG = card => {
        let value
        switch (card.value) {
            case 1:
                value = 'A'
                break;

            case 11:
                value = 'J'
                break;

            case 12:
                value = 'Q'
                break;

            case 13:
                value = 'K'
                break;
        
            default:
                value = card.value
                break;
        }
        return `${value}${card.suit[0].toUpperCase()}.png`
    }

    const checkGinPlayer = () => {
        if (players[0].calcDeadwood() == 0) {
            players[0].score += 25 + players[1].calcDeadwood()
            
            //console.log('Player 1 score', players[0].score)
            //console.log('Player 2 score', players[1].score)

            if (players[0].score >= 100) {
                alert(`You won by going Gin`)
                history.push('/')
            } else {
                alert(`You went Gin and gained ${25+players[1].calcDeadwood()} points`)
                history.push('/chat')
                //console.log('chat')
            }
        }

        if (players[1].calcDeadwood() == 0) {
            //console.log('player 2 score before calc', players[1].score)
            //console.log('player 1 deadwood', players[0].calcDeadwood())
            players[1].score += 25 + players[0].calcDeadwood()

            //console.log('Player 1 score', players[0].score)
            //console.log('Player 2 score', players[1].score)

            if (players[1].score >= 100) {
                alert(`${players[1].name} went Gin and won`)
                history.push('/')
            } else {
                alert(`${players[1].name} went Gin and gained ${25+players[0].calcDeadwood()} points`)
                history.push('/chat')
            }
        }
    }    

    const faceUpClicked = e => {
        checkGinPlayer()

        if (player==null && gameState=='draw') {
            e.preventDefault()
            players[0].hand.push(card)
            let tmpDiscard = [...discardPile]
            // tmpPile.splice(tmpPile.indexOf(card), 1)
            tmpDiscard.shift()
            setDiscardPile(tmpDiscard)
            players[0].calcDeadwood()
            // checkGinPlayer()
            setGameState('discard')
        }

        if (player===players[0] && gameState=='discard') {
            e.preventDefault()

            if (players[0].calcDeadwood() > 10) {
                let tmpPile = [...discardPile]
                tmpPile.unshift(card)
                setDiscardPile(tmpPile)
                players[0].hand.splice(players[0].hand.indexOf(card), 1)
                // checkGinPlayer()
                setGameState('opponent')
            } else if (players[0].calcDeadwood() - (card.value<11 ? card.value : 10) === 0) {
                let tmpPile = [...discardPile]
                tmpPile.unshift(card)
                setDiscardPile(tmpPile)
                players[0].hand.splice(players[0].hand.indexOf(card), 1)
                checkGinPlayer()
            } else {
                //highlight knock and discard piles
                setGameState('knock-discard')
                setCurrentCard(card)
            }
        }

        if (pile.name=='discard' && gameState=='knock-discard') {
                let tmpPile = [...discardPile]
                //console.log('currentCard', currentCard)
                tmpPile.unshift(currentCard)
                setDiscardPile(tmpPile)
                players[0].hand.splice(players[0].hand.indexOf(currentCard), 1)
                // checkGinPlayer()
                setGameState('opponent')
        }
    }

    const faceDownClicked = e => {
        checkGinPlayer()

        if (player==null && gameState=='draw') {
            e.preventDefault()
            players[0].hand.push(card)
            let tmpPile = [...deck]
            tmpPile.splice(tmpPile.indexOf(card), 1)

            if (deck.length < 1) {
                let tmpDiscard = [...discardPile]
                let tmpDeck = tmpDiscard
                tmpDiscard = [tmpDiscard[0]]
    
                tmpDeck.forEach((c, index) => {
                    if (c == tmpDiscard[0]) {
                        tmpDeck.splice(index, 1)
                    }
                })
                setDiscardPile(tmpDiscard)
            }

            setDeck(tmpPile)
            // checkGinPlayer()
            setGameState('discard')
        }

        if (isKnock && gameState=='knock-discard') {
            players[1].calcDeadwood()
            //console.log('deadwood before', players[1].deadwoodCards)
            players[0].possibleMelds.map(meld=> {
                if (meld.length == 3)
                {
                    players[1].deadwoodCards.map((card, index) => {
                        if (meld[0].value == meld[1].value == card.value)
                        {
                            players[1].deadwoodCards.splice(index, 1)
                            return
                        }
                        if ((meld[0].suit == meld[1].suit == card.suit) && ((card.value == meld[0].value-1) || (card.value == meld[2].value+1)))
                        {
                            players[1].deadwoodCards.splice(index, 1)
                            return
                        }
                    })
                }
            })
            //console.log('deadwood after', players[1].deadwoodCards)

            let theirDeadwood = 0
            players[1].deadwoodCards.map(card =>{
                theirDeadwood += (card.value<11 ? card.value : 10)
            })
            players[0].score += theirDeadwood - players[0].calcDeadwood()
            //console.log('their deadwood', theirDeadwood)
            //console.log('our score', players[0].score)
            if (players[0].score >= 100) {
                alert(`You won by knocking!`)
                history.push('/')
            } else {
                alert(`You knocked and ${theirDeadwood - players[0].calcDeadwood() > -1 ? 'gained' : 'lost'} ${Math.abs(theirDeadwood - players[0].calcDeadwood())} points`)
                history.push('/chat')
                //console.log('chat')
            }
            // let oldDeadwoodCards= players[0].deadwoodCards
            // let tmpPile = [...discardPile]
            // tmpPile.unshift(card)
            // setDiscardPile(tmpPile)
            // players[0].hand.splice(players[0].hand.indexOf(card), 1)
            // players[0].getMelds()
            // let melds = players[0].bestMelds
            // players[1].calcDeadwood()
            // let player2Deadwood = players[1].deadwoodCards
            // players[0].hand.push(player2Deadwood)
            // players[0].getMelds()
            // players[0].calcDeadwood()
            // let newDeadwoodCards = players[0].deadwoodCards
            // //console.log('oldDeadwoodCards', oldDeadwoodCards)
            // //console.log('newDeadwoodCards', newDeadwoodCards)
            // let trueDeadwoodCards = oldDeadwoodCards.filter(value => newDeadwoodCards.includes(value))
            // //console.log('trueDeadwoodCards', trueDeadwoodCards)
        }
    }

    return (
        <>
            {card && (
                <div className="Card"
                    onClick={e => isFaceUpState ? faceUpClicked(e) : faceDownClicked(e)}
                    style={{
                        backgroundImage: isKnock ? `url('${process.env.PUBLIC_URL}/card-images/knock.png')` : (
                            `url("${process.env.PUBLIC_URL + `/card-images/${isFaceUpState
                                ? mapToPNG(card) 
                                : 'purple_back.png' }`}")`
                        )
                    }}

                />
            )}
        </>
    )
}

export default CardComponent
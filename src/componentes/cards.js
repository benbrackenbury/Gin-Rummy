class Card {
    suit = null
    value = 0

    constructor(suit, value) {
        this.suit = suit
        this.value = value
    }
}

const suits = {
    HEARTS: 'hearts',
    CLUBS: 'clubs',
    SPADES: 'spades',
    DIAMONDS: 'diamonds'
}

export {Card, suits}
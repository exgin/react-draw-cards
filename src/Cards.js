import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import Card from './Card';
import './Cards.css';

const Cards = () => {
  // changing cards
  const [cards, setCards] = useState([]);

  const BASE_URL = `https://deckofcardsapi.com/api/deck`;
  const NEW_DECK = `${BASE_URL}/new/shuffle`;

  // start off with card data
  useEffect(() => {
    const newData = async () => {
      const res = await axios.get(NEW_DECK);
      setCards(newData.data);
    };
    newData();
  }, [setCards]);

  const drawCard = async () => {
    const deck = await axios.get(`${BASE_URL}/${res.data.deck_id}/draw/?count=1`);

    setCards((cards) => [...cards, { ...deck.data, id: res.data.deck_id }]);
  };

  return (
    <div className='Cards'>
      <h1>Deck of Cards Picker</h1>
      <button onClick={drawCard}>Give Me a Card!</button>
      <div className='Cards-spot'>
        {cards.map((card) => (
          <Card key={card.id} image={card.cards.image} />
        ))}
      </div>
    </div>
  );
};

export default Cards;

// res.remaining === 0 : 'No cards left!' ? drawCard

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import Card from './Card';
import './Cards.css';

/* TASKS:

*/

const Cards = () => {
  // changing cards
  const [cards, setCards] = useState(null);
  const [cardDrawn, setCardDrawn] = useState([]);
  const [autoDraw, setAutoDraw] = useState(false);
  const timerId = useRef();

  const BASE_URL = `https://deckofcardsapi.com/api/deck`;
  const NEW_DECK = `${BASE_URL}/new/shuffle/`;

  // start off with card data
  useEffect(() => {
    const newData = async () => {
      const res = await axios.get(NEW_DECK);
      setCards(res.data);
    };
    newData();
  }, [setCards]); // when our res.data changes, we get a new deck shuffled

  useEffect(() => {
    const drawCard = async () => {
      const { deck_id } = cards; // destrcut from our 'global' state in useEffect
      try {
        const singleCard = await axios.get(`${BASE_URL}/${deck_id}/draw/?count=1`);

        if (singleCard.data.remaining === 0) {
          alert('No Cards Remaining!');
          throw new Error('No Cards Remaining!');
        }
        // adding to our cardsDrawn array data structure
        setCardDrawn((cardDrawn) => [...cardDrawn, { ...singleCard.data, id: uuid() }]);
      } catch (error) {
        console.error(error);
      }
    };

    // if autoDraw is fasle & timer isn't made, make one | => draw a card every second
    if (autoDraw && !timerId.current) {
      timerId.current = setInterval(async () => {
        await drawCard();
      }, 1000);
    }

    timerId.current = setInterval(() => {
      setAutoDraw((seconds) => seconds + 1);
    }, 1000);

    return () => {
      clearInterval(timerId.current); // stop timer
      timerId.current = null; // set obj to null
    };
  }, [autoDraw, setAutoDraw, cards]);

  const stopTimer = () => {
    clearInterval(timerId.current);
  };

  const toggleDrawing = () => {
    setAutoDraw((drawing) => !drawing);
  };

  return (
    <div className='Cards'>
      <h1>Deck of Cards Picker</h1>
      <button className='Cards-btn' onClick={toggleDrawing}>
        Give Me a Cards!
      </button>
      <button className='Cards-stop' onClick={stopTimer}>
        Stop drawing
      </button>
      <div className='Cards-spot'>
        {cardDrawn.map((card) => (
          <Card key={card.id} image={card.cards[0].image} />
        ))}
      </div>
    </div>
  );
};

export default Cards;

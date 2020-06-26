import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import Card from './Card';
import './Cards.css';

/* END OF JUNE/25TH/2020 | Things to complete & notes | C: complete task, N: a note
- CT: I have the cards drawing, can see in console, I need to get the image on the screen for each card being drawn
- N: I know thats within the drawCard() function & it has to do with mapping over our state, cardDrawn, maybe
I have to use setCardDrawn?
--------------------------------

JUNE/26TH/2020
- show 'no cards remaining' when deck runs out of cards

*/

const Cards = () => {
  // changing cards
  const [cards, setCards] = useState(null);
  const [cardDrawn, setCardDrawn] = useState([]);

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

  const drawCard = async () => {
    const { deck_id } = cards; // destrcut from our 'global' state in useEffect
    const singleCard = await axios.get(`${BASE_URL}/${deck_id}/draw/?count=1`);

    // adding to our cardsDrawn array data structure
    setCardDrawn((cardDrawn) => [...cardDrawn, { ...singleCard.data, id: uuid() }]);
  };

  return (
    <div className='Cards'>
      <h1>Deck of Cards Picker</h1>
      <button onClick={drawCard}>Give Me a Card!</button>
      <div className='Cards-spot'>
        {cardDrawn.map((card) => (
          <Card key={card.id} image={card.cards[0].image} />
        ))}
      </div>
    </div>
  );
};

export default Cards;

// res.remaining === 0 : 'No cards left!' ? drawCard

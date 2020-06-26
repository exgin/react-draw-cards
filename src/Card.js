import React, { useState } from 'react';
import './Card.css';

const Card = ({ image }) => {
  // the card's angle is changing, so we need to use state
  const [{ ang }] = useState({ ang: Math.random() * 90 - 45 });

  const rotateCard = `transfom: rotate(${ang}deg)`;

  return <img className='Card' src={image} alt='card' stlye={{ rotateCard }} />;
};

export default Card;

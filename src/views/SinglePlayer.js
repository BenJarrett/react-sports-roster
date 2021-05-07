import React, { useState, useEffect } from 'react';
import {
  useParams
} from 'react-router-dom';
import { getSinglePlayer } from '../helpers/data/playerData';

export default function SinglePlayer() {
  const [player, setPlayer] = useState({});
  const { firebaseKey } = useParams();

  useEffect(() => {
    getSinglePlayer(firebaseKey)
      .then(setPlayer);
  }, []);

  return (
    <div>
      <h1>Single Player</h1>
      <h2>{player.name}</h2>
      <h5>{player.position}</h5>
      <h5>{player.imageURL}</h5>
    </div>
  );
}

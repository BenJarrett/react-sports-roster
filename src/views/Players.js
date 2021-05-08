import React from 'react';
import PropTypes from 'prop-types';
import PlayerCard from '../App/components/PlayerCard';

function Players({ players, setPlayers }) {
  return (
    <>
    <h2> Team Roster </h2>
      <div className="card-container">
        {players.map((playerInfo) => (
          <PlayerCard
            key={playerInfo.firebaseKey}
            firebaseKey={playerInfo.firebaseKey}
            name={playerInfo.name}
            position={playerInfo.position}
            imageURL={playerInfo.imageURL}
            setPlayers={setPlayers}
          />
        ))}
      </div>
    </>
  );
}

Players.propTypes = {
  players: PropTypes.array.isRequired,
  setPlayers: PropTypes.func.isRequired
};

export default Players;

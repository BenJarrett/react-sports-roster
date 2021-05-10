import React, { useState } from 'react';

import {
  Button,
  Card,
  CardText,
  CardTitle
} from 'reactstrap';
import PropTypes from 'prop-types';
import { deletePlayer } from '../../helpers/data/playerData';
import PlayerForm from './PlayerForm';

const PlayerCard = ({
  firebaseKey,
  name,
  position,
  imageURL,
  setPlayers

}) => {
  const [editing, setEditing] = useState(false);

  const handleClick = (type) => {
    switch (type) {
      case 'delete':
        deletePlayer(firebaseKey)
          .then(setPlayers);
        break;
      case 'edit':
        setEditing((prevState) => !prevState);
        break;
      default:
        console.warn('nothing selected');
    }
  };

  return (
    <Card body style={{
      width: '18rem',
      flex: 'initial',
      flexDirection: 'row',
      flexWrap: 'wrap',
      margin: '8px'
    }}>
      <CardTitle tag="h5">{name}</CardTitle>
      <CardText>Position: {position}</CardText>
      <CardText></CardText>
      <img style={{ width: '14rem', alignSelf: 'center', height: '18rem' }} src={imageURL} className="photo" alt="Card image cap" />
      <Button style={{ backgroundColor: '#D8E1FF', color: '#000000', margin: '1rem' }} onClick={() => handleClick('delete')}>Delete Player</Button>
      <Button style={{ backgroundColor: '#D8E1FF', color: '#000000', margin: '1rem' }}onClick={() => handleClick('edit')}>
        {editing ? 'Close Form' : 'Edit Player'}
      </Button>
      {
        editing && <PlayerForm
        style={{ width: '5rem' }}
          formTitle='Edit Player'
          setPlayers={setPlayers}
          firebaseKey={firebaseKey}
          name={name}
          position={position}
          imageURL={imageURL}
        />
      }
    </Card>
  );
};

PlayerCard.propTypes = {
  firebaseKey: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  imageURL: PropTypes.string,
  setPlayers: PropTypes.func
};

export default PlayerCard;

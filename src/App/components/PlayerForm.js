import React, { useState } from 'react';
import {
  Button, Form, FormGroup, Label, Input
} from 'reactstrap';
import PropTypes from 'prop-types';
import { addPlayer, updatePlayer } from '../../helpers/data/playerData';

const PlayerForm = ({
  formTitle,
  setPlayers,
  name,
  position,
  imageURL,
  firebaseKey
}) => {
  const [player, setPlayer] = useState({
    name: name || '',
    position: position || '',
    imageURL: imageURL || '',
    firebaseKey: firebaseKey || null
  });

  const handleInputChange = (e) => {
    setPlayer((prevState) => ({
      ...prevState,
      [e.target.name]:
        e.target.name === 'name' ? e.target.value : e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (player.firebaseKey) {
      updatePlayer(player).then(setPlayers);
    } else {
      addPlayer(player).then(setPlayers);
      setPlayers({
        name: '',
        position: '',
        imageURL: '',
        firebaseKey: null
      });
    }
  };

  return (
    <div className='player-form'>
      <Form style={{ width: '35rem' }} id='addPlayerForm' autoComplete='off' onSubmit={handleSubmit}>
        <h2>{formTitle}</h2>
        <FormGroup>
          <Label for="name">Name:</Label>
          <Input
            name='name'
            id='name'
            value={player.name}
            type='text'
            placeholder='Enter a Player Name'
            onChange={handleInputChange}
          />
        </FormGroup>

        <FormGroup>
          <Label for="position">Position:</Label>
          <Input
            name='position'
            id='position'
            value={player.position}
            type='text'
            placeholder='Enter The Position of the Player'
            onChange={handleInputChange}
          />
        </FormGroup>

        <FormGroup>
          <Label for="imageURL">image:</Label>
          <Input
            name='imageURL'
            id='imageURL'
            value={player.imageURL}
            type='url'
            placeholder='Add an Image'
            onChange={handleInputChange}
          />
        </FormGroup>

        <Button type='submit'>Submit</Button>
      </Form>
    </div>
  );
};

PlayerForm.propTypes = {
  formTitle: PropTypes.string.isRequired,
  setPlayers: PropTypes.func,
  name: PropTypes.string,
  position: PropTypes.string,
  imageURL: PropTypes.URL,
  firebaseKey: PropTypes.string
};

export default PlayerForm;

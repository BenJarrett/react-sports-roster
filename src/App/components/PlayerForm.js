import React, { useState } from 'react';
import {
  Button, Form, FormGroup, Label, Input
} from 'reactstrap';
import PropTypes from 'prop-types';
import { addSinglePlayer, updatePlayer } from '../../helpers/data/playerData';

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
    setPlayers((prevState) => ({
      ...prevState,
      [e.target.name]:
        e.target.name === 'grade' ? Number(e.target.value) : e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (player.firebaseKey) {
      // make call to updateStudent to update student and rerender the DOM
      updatePlayer(player).then(setPlayers); // this is the same as below, just shorthand.
      // updateStudent(student).then((studentArray) => setStudents(studentArray));
    } else {
      addSinglePlayer(player).then(setPlayers); // this is the same as below, just shorthand.
      // addStudent(student).then((studentArray) => setStudents(studentArray));

      // clear inputs
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
      <Form id='addPlayerForm' autoComplete='off' onSubmit={handleSubmit}>
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
          <Label for="Postion">Position:</Label>
          <Input
            name='player'
            id='player'
            value={player.teacher}
            type='text'
            placeholder='Enter The Postion of the Player'
            onChange={handleInputChange}
          />
        </FormGroup>

        <FormGroup>
          <Label for="image">image:</Label>
          <Input
            name='image'
            id='image'
            value={player.imageURL}
            type='text'
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
  imageURL: PropTypes.string,
  firebaseKey: PropTypes.string
};

export default PlayerForm;
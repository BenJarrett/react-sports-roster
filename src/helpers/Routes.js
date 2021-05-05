import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Home from '../views/Home';
import AddPlayers from '../views/AddPlayer';
import Players from '../views/Players';

export default function Routes({ players, setPlayers }) {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route
          path='/students'
          component={() => <Players students={players} setStudents={setPlayers} />}
        />
        <Route
          path='/add-student'
          component={() => <AddPlayers setStudents={setPlayers} />}
        />
      </Switch>
    </div>
  );
}

Routes.propTypes = {
  players: PropTypes.array.isRequired,
  setPlayers: PropTypes.func.isRequired
};

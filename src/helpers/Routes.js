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
          path='/players'
          component={() => <Players players={players} setPlayers={setPlayers} />}
        />
        <Route
          path='/add-players'
          component={() => <AddPlayers setPlayers={setPlayers} />}
        />
      </Switch>
    </div>
  );
}

Routes.propTypes = {
  players: PropTypes.array.isRequired,
  setPlayers: PropTypes.func.isRequired
};

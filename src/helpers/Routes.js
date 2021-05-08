import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Home from '../views/Home';
import AddPlayers from '../views/AddPlayer';
import Players from '../views/Players';

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  const routeChecker = (taco) => (user
    ? (<Component {...taco} user={user} />)
    : (<Redirect to={{ pathname: '/', state: { from: taco.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.func,
  user: PropTypes.any
};

export default function Routes({ user, players, setPlayers }) {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={Home} />
        <PrivateRoute
          exact
          path='/players'
          user={user}
          component={() => <Players players={players} setPlayers={setPlayers} />}
        />
        <PrivateRoute
          user={user}
          path='/add-players'
          component={() => <AddPlayers setPlayers={setPlayers} />}
        />
      </Switch>
    </div>
  );
}

Routes.propTypes = {
  players: PropTypes.array.isRequired,
  setPlayers: PropTypes.func.isRequired,
  user: PropTypes.any
};

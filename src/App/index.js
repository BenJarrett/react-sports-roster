import React, { useState, useEffect } from 'react';
import './App.scss';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  BrowserRouter as Router
} from 'react-router-dom';
import firebaseConfig from '../helpers/apiKeys';
import { getPlayers } from '../helpers/data/playerData';
import Routes from '../helpers/Routes';
import NavBar from './components/NavBar';

firebase.initializeApp(firebaseConfig);

function App() {
  const [players, setPlayers] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getPlayers().then(setPlayers);
  }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authed) => {
      if (authed) {
        const userInfoObj = {
          fullName: authed.displayName,
          profileImage: authed.photoURL,
          uid: authed.uid,
          user: authed.email.split('@')[0]
        };
        setUser(userInfoObj);
      } else if (user || user === null) {
        setUser(false);
      }
    });
  }, []);

  return (
    <>
      <Router>
        <NavBar user={user}/>
        <Routes
        user={user}
          players={players}
          setPlayers={setPlayers}
        />
      </Router>
    </>
  );
}

export default App;

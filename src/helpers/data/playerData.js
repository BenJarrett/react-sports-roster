import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbUrl = firebaseConfig.databaseURL;

const getPlayers = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/players.json`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

const addPlayer = (obj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/players.json`, obj)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/players/${response.data.name}.json`, body)
        .then(() => {
          getPlayers().then((playersArray) => resolve(playersArray));
        });
    }).catch((error) => reject(error));
});

const deletePlayer = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/players/${firebaseKey}.json`)
    .then(() => getPlayers().then((playersArray) => resolve(playersArray)))
    .catch((error) => reject(error));
});

const updatePlayer = (player) => new Promise((resolve, reject) => {
  console.warn(player.firebaseKey);
  axios.patch(`${dbUrl}/players/${player.firebaseKey}.json`, player)
    .then(() => getPlayers().then(resolve))
    .catch((error) => reject(error));
});

const getSinglePlayer = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/players/${firebaseKey}.json`)
    .then((student) => resolve(student.data))
    .catch((error) => reject(error));
});

export {
  addPlayer,
  getPlayers,
  updatePlayer,
  deletePlayer,
  getSinglePlayer
};

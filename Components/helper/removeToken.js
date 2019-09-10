import {AsyncStorage} from 'react-native';

const removeToken = () => {
  AsyncStorage.removeItem('token', err => {
    console.log(err);
  });
};

export default removeToken;

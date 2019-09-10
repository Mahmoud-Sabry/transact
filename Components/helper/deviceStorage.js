import {AsyncStorage} from 'react-native';
const deviceStorage = async token => {
  console.log('In deviceStorage');
  try {
    await AsyncStorage.setItem('token', token);
    console.log('inside the deviceStorage', token);
  } catch (error) {
    console.log('error in deviceStorage', error);
  }
};

export default deviceStorage;

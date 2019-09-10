import {AsyncStorage} from 'react-native';
export async function getToken() {
  const value = await AsyncStorage.getItem('token');
  console.log('value =', value);
  return value;

  return value ? true : false;

  // var token = false;
  // try {
  //   const value = await AsyncStorage.getItem('token');
  //   return value?true:false
  //   if (value != null) {
  //     token = true;
  //     console.log('value ', value);
  //   } else token = false;
  // } catch (error) {
  //   console.log('error in getToken', error);
  // }
  // console.log('here', token);
  // return token;
}

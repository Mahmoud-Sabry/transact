import {AsyncStorage} from 'react-native';
import removeToken from './removeToken';
import RNRestart from 'react-native-restart';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
export function formateDate(date) {
  let datetime = new Date(date);
  let hour,
    duration = '';

  if (datetime.getHours() > 12) {
    hour = datetime.getHours() - 12;
    duration = 'PM';
  } else {
    hour = datetime.getHours();
    duration = 'AM';
  }
  let formatted_date =
    datetime.getDate() +
    '/' +
    (datetime.getMonth() + 1) +
    '/' +
    +datetime.getFullYear() +
    ' ' +
    hour +
    ':' +
    datetime.getMinutes() +
    ' ' +
    duration;
  // +
  // ":"
  // +datetime.getSeconds();
  return formatted_date;
}

export function LogOut() {
  removeToken();
  RNRestart.Restart();
}

export function CustomNums(number) {
  var numbers = number.toString().split('.');
  var numLength = numbers[0].length;
  var numString = '';
  if (numLength == 7) {
    numString = numbers[0].slice(0, 4);
    numString = numString + 'K';
    return numString;
  } else if (numLength > 7 && numLength < 12) {
    var count = numLength - 6;
    numString = numbers[0].slice(0, count + 1);
    numString = numString + 'M';
    return numString;
  } else if (numLength < 6) {
    numString = numbers[0];
    return numString;
  }
}

//Check for token
export function isAuthenticated() {
  // Check whether the current time is past the
  // access token's expiry time
  const id_token = AsyncStorage.getItem('token');
  //set Authorization token in the header
  // this.setAuthTokenInHeader(id_token);
  //User data
  const decoded = jwt_decode(id_token);
  const expireTime = decoded.exp;
  const currentTime = Date.now() / 1000;

  return expireTime < currentTime;
}

import {AsyncStorage} from 'react-native';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
const actions = {
  GET_DECODED_DATA: 'GET_CASHIERS_SHIFT_DATA',
  GET_SETTING_RECEIPT_DATA: 'GET_SETTING_RECEIPT_DATA',
  REFRESH: 'REFRESH',
  fetchDecoded: () => dispatch => {
    AsyncStorage.getItem('token', (err, result) => {
      const decoded = jwt_decode(result);
      console.log('Decoded in fetchDecoded =>', decoded);
      console.log('fetchDecoded method', result);
      dispatch({
        type: actions.GET_DECODED_DATA,
        decoded: decoded,
      });
    });
  },
  fetchSETTING: () => dispatch => {
    console.log('fetch_setting_method');
    // if (setting == null) {
    AsyncStorage.getItem('token', (err, result) => {
      axios
        .get('https://stagingbe.transacthq.com/api/services/setting', {
          headers: {
            Authorization: result,
          },
        })
        .then(res => {
          console.log('fetchSETTING => res ', res.data);
          dispatch({
            type: actions.GET_SETTING_RECEIPT_DATA,
            setting: res.data,
          });
        })
        .catch(err => {
          console.log('Error? ', err);
        });
    });
    // } else return;
  },
  refresh: bool => dispatch => {
    dispatch({
      type: actions.REFRESH,
      refreshing: bool,
    });
  },
};

export default actions;

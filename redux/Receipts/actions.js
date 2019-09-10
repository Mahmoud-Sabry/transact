import {AsyncStorage} from 'react-native';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
const actions = {
  GET_RECEIPTS_DATA: 'GET_RECEIPTS_DATA',
  GET_SETTINGS_DATA: 'GET_SETTINGS_DATA',
  REFRESH: 'REFRESH',
  fetchReceiptsData: () => dispatch => {
    return new Promise((resolve, reject) => {
      console.log('fetchReceiptsData method');

      AsyncStorage.getItem('token', (err, result) => {
        const decoded = jwt_decode(result);
        console.log('Decoded =>', decoded);
        axios
          .get('https://stagingbe.transacthq.com/api/clientadmin/invoice', {
            headers: {
              Authorization: result,
            },
          })
          .then(res => {
            console.log('fetchReceiptsData => res ', res.data);
            dispatch({
              type: actions.GET_RECEIPTS_DATA,
              data: res.data,
              decoded: decoded,
            });
            resolve(true);
          })
          .catch(err => {
            console.log('Error? ', err);
            reject(false);
          });
      });
    });
  },
  fetchSETTING: () => dispatch => {
    console.log('fetch setting method');
    return new Promise((resolve, reject) => {
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
              type: actions.GET_SETTINGS_DATA,
              setting: res.data,
            });
            resolve(true);
          })
          .catch(err => {
            console.log('Error? ', err);
            reject(false);
          });
      });
    });
  },
  refresh: bool => dispatch => {
    dispatch({
      type: actions.REFRESH,
      refreshing: bool,
    });
  },
};

export default actions;

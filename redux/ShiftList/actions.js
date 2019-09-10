import {AsyncStorage} from 'react-native';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
const actions = {
  GET_CASHIERS_SHIFT_DATA: 'GET_CASHIERS_SHIFT_DATA',
  REFRESH: 'REFRESH',
  fetchCashiersShiftData: shiftId => dispatch => {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('token', (err, result) => {
        const decoded = jwt_decode(result);
        console.log('Decoded =>', decoded);
        console.log('fetchCashiersShiftData method', result);
        axios
          .post(
            'https://stagingbe.transacthq.com/api/clientadmin/log-details',
            {shiftId},
            {
              headers: {
                Authorization: result,
              },
            },
          )
          .then(res => {
            console.log('fetchCashiersShiftData => res ', res.data.receipts);
            dispatch({
              type: actions.GET_CASHIERS_SHIFT_DATA,
              data: res.data.receipts,
              decoded: decoded,
            });
            resolve(true);
          })
          .catch(err => {
            console.log('Error fetchCashiersShiftData ? ', err);
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

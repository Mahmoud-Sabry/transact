import {AsyncStorage} from 'react-native';
import axios from 'axios';

const actions = {
  GET_CASHIERS_DATA: 'GET_CASHIERS_DATA',
  REFRESH: 'REFRESH',
  fetchCashiersData: () => dispatch => {
    return new Promise((resolve, reject) => {
      console.log('fetchCashiersData method');

      AsyncStorage.getItem('token', (err, result) => {
        axios
          .get(
            'https://stagingbe.transacthq.com/api/clientadmin/cashier-logs',
            {
              headers: {
                Authorization: result,
              },
            },
          )
          .then(res => {
            console.log('fetchCashiersData => res ', res);
            dispatch({
              type: actions.GET_CASHIERS_DATA,
              data: res, //.data,
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

import { AsyncStorage } from "react-native";
import axios from "axios";

const actions = {
  GET_DATA: "GET_DATA",
  REFRESH: "REFRESH",
  fetchData: () => dispatch => {
    return new Promise((resolve, reject) => {
      console.log("featchData method");

      AsyncStorage.getItem("token", (err, result) => {
        axios
          .get(
            "https://stagingbe.transacthq.com/api/clientadmin/cash-management",
            {
              headers: {
                Authorization: result
              }
            }
          )
          .then(res => {
            console.log("fetchData => res ", res);
            dispatch({
              type: actions.GET_DATA,
              data: res.data
            });
            resolve(true);
          })
          .catch(err => {
            console.log("Error? ", err);
            reject(false);
          });
      });
    });
  },
  refresh: bool => dispatch => {
    dispatch({
      type: actions.REFRESH,
      refreshing: bool
    });
  }
};

export default actions;

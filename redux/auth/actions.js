import deviceStorage from "../../Components/helper/deviceStorage";
import axios from "axios";
const actions = {
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_ERROR: "LOGIN_ERROR",
  LOGOUT: "LOGOUT",
  USER: "USER",
  PASSWORD: "PASSWORD",

  user: username => dispatch => {
    dispatch({
      type: actions.USER,
      username: username
    });
    console.log("username ", username);
  },
  pass: password => dispatch => {
    dispatch({
      type: actions.PASSWORD,
      password: password
    });
    console.log("password ", password);
  },
  login: (username, password, navigation) => dispatch => {
    if (username != "" && password != "") {
      axios
        .post("https://stagingbe.transacthq.com/api/clientadmin/login", {
          username,
          password
        })
        .then(responseJson => {
          dispatch({
            type: actions.LOGIN_SUCCESS,
            token: responseJson.data.token
          });
          console.log("response ", responseJson);
          console.log("token ", responseJson.data.token);
          deviceStorage(responseJson.data.token);
          navigation.navigate("Dr_Nav");
        })
        .catch(err => {
          if (err.response.data.errors.username == undefined)
            alert(err.response.data.errors.password);
          else alert(err.response.data.errors.username);
        });
    } else {
      alert("No UserName OR Password !!");
    }
  },
  setAuthTokenInHeader: token => {
    if (token) {
      //apply to every request
      axios.defaults.headers.common["Authorization"] = token;
    } else {
      //Delete Auth header
      delete axios.defaults.headers.common["Authorization"];
    }
  }
};

export default actions;

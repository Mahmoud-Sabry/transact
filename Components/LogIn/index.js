import React, { Component } from "react";
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Text,
  View
} from "react-native";
import logo from "../../Images/logo_c.png";
import { AsyncStorage } from "react-native";
import { connect } from "react-redux";
import authActions from "../../redux/auth/actions";
import { isAuthenticated } from "../helper";
const { login, user, pass } = authActions;
var { height, width } = Dimensions.get("window");

class LogIn extends Component {
  constructor(props) {
    super(props);
    AsyncStorage.getItem("token", (err, result) => {
      console.log("Token ", result);
      if (result != undefined) {
        if (isAuthenticated) this.props.navigation.navigate("Dr_Nav");
      }
    });
  }
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.parent}>
        <Image source={logo} style={styles.Logo} />
        <TextInput
          style={styles.input}
          placeholder="User Name"
          onChangeText={text => this.props.user(text)}
        />

        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={text => this.props.pass(text)}
        />

        <TouchableOpacity
          style={styles.buttonn}
          onPress={_ =>
            this.props.login(
              this.props.username,
              this.props.password,
              this.props.navigation
            )
          }
        >
          <Text
            style={{
              color: "rgba(31, 29, 68,1)"
              // fontFamily: "Lobster-Regular"
            }}
          >
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    username: state.auth.username,
    password: state.auth.password,
    error: state.auth.error,
    token: state.auth.token
  };
}

export default connect(
  mapStateToProps,
  { login, user, pass }
)(LogIn);

const styles = StyleSheet.create({
  Logo: {
    margin: 10,
    width: 260,
    height: 65,
    justifyContent: "center",
    alignItems: "center"
  },
  heading: {
    fontSize: 50,
    textAlign: "center",
    marginTop: height / 10,
    padding: 20,
    color: "black",
    fontFamily: "SourceSansPro-BoldItalic"
  },
  input: {
    margin: 5,
    borderRadius: 20,
    width: width - 40,
    backgroundColor: "#e8f0fe" //'rgba(123, 124, 134,1)',
    // fontFamily: "SourceSansPro-Light"
    // color:"lightgreen",
    // marginTop:height/2
  },
  parent2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
    // backgroundColor:'rgb(32, 53, 70)'
    // marginTop:height/2
  },
  parent: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#ffffff"
    // marginTop:height/2
  },
  buttonn: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: width / 4,
    marginRight: width / 4,
    width: width / 2,
    height: 50,
    borderRadius: 30,
    margin: 5,
    fontSize: 20,
    backgroundColor: "#1890ff" //'rgba(123, 124, 134,1)',
    // fontFamily: "SourceSansPro-BoldItalic"
  }
});

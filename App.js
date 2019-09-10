import React from "react";
import { AppLoading } from "expo";
import { Container, Text } from "native-base";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { applyMiddleware } from "redux";
import Start from "./Components/start";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { createStore } from "redux";
import reducers from "./redux/reducers";
const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
console.disableYellowBox = true;
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"), //Montserrat.ttf
      Montserrat: require("./assets/fonts/Montserrat.ttf"),
      ...Ionicons.font
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <Provider store={store}>
        <Start />
      </Provider>
    );
  }
}

// const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
// console.disableYellowBox = true;
// class App extends Component {
//   render() {
//     return (
//       <Provider store={store}>
//         <Start />
//       </Provider>
//     );
//   }
// }
// export default App;

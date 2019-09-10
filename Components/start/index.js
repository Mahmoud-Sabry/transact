import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Dr_Nav from "../DrawerNavigator";
import LogIn from "../LogIn";
const AppNavigator = createStackNavigator(
  {
    LogIn: {
      screen: LogIn
    },
    Dr_Nav: {
      screen: Dr_Nav
    }
  },
  {
    headerMode: "none"
  }
);

export default createAppContainer(AppNavigator);

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Cash from "./cashManagement";
import Comment from "./cashierComment";
const CashNavigator = createStackNavigator(
  {
    Cash: {
      screen: Cash
    },
    Comment: {
      screen: Comment
    }
  },
  {
    headerMode: "none"
  }
);
export default createAppContainer(CashNavigator);

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
// import Cashiers from './try';
import Cashiers from "./cashierShifts";
import cashier from "./cashierShift";
import ShiftReceipt from "./Receipt";
const CashNavigator = createStackNavigator(
  {
    Cashiers: {
      screen: Cashiers
    },
    cashier: {
      screen: cashier
    },
    ShiftReceipt: {
      screen: ShiftReceipt
    }
  },
  {
    headerMode: "none"
  }
);
export default createAppContainer(CashNavigator);

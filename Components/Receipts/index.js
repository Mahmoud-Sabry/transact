import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Receipts from "./Receipts";
import Receipt from "../CashierShifts/Receipt";
import ReceiptsItem from "./ReceiptsItem";
const CashNavigator = createStackNavigator(
  {
    Receipts: {
      screen: Receipts
    },
    ReceiptsItem: {
      screen: ReceiptsItem
    },
    Receipt: {
      screen: Receipt
    }
  },
  {
    headerMode: "none"
  }
);
export default createAppContainer(CashNavigator);

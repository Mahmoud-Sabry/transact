import auth from './auth/reducer';
import CashManagement from './cashManagement/reducer';
import {combineReducers} from 'redux';
import Dashboard from './Dashboard/reducer';
import CashierShifts from './CashierShifts/reducer';
import ShiftList from './ShiftList/reducer';
import Receipts from './Receipts/reducer';
import ShiftReceipt from './ShiftReceipt/reducer';
const rootReducer = combineReducers({
  auth,
  CashManagement,
  Dashboard,
  CashierShifts,
  ShiftList,
  Receipts,
  ShiftReceipt,
});

export default rootReducer;

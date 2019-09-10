import actions from './actions';

const initialState = {
  decoded: null,
  setting: null,
};

export default function cashReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_DECODED_DATA:
      return {...state, decoded: action.decoded};
    case actions.GET_SETTING_RECEIPT_DATA:
      console.log('GET_SETTING_RECEIPT_DATA', action);

      return {...state, setting: action.setting};
    case actions.REFRESH:
      return {...state, refreshing: action.refreshing};
    default:
      return state;
  }
}

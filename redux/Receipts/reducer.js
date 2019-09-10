import actions from './actions';

const initialState = {
  data: [],
  refreshing: false,
  Receipt: {},
  decoded: {},
  setting: null,
  dola: false,
};

export default function cashReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_RECEIPTS_DATA:
      return {...state, data: action.data, decoded: action.decoded};
    case actions.GET_SETTINGS_DATA:
      console.log('ACTion_el_gamela', action);
      const newState = Object.assign({}, state, {
        setting: action.setting,
        dola: true,
      });
      return newState;
    case actions.REFRESH:
      return {...state, refreshing: action.refreshing};
    default:
      return state;
  }
}

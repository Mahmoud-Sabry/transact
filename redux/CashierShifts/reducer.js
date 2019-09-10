import actions from './actions';

const initialState = {
  data: [],
  refreshing: false,
  cahierShift: {},
};

export default function cashReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_CASHIERS_DATA:
      return {...state, data: action.data};
    case actions.REFRESH:
      return {...state, refreshing: action.refreshing};
    default:
      return state;
  }
}

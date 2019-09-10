import actions from './actions';

const initialState = {
  data: [],
  refreshing: false,
};

export default function ShiftList(state = initialState, action) {
  switch (action.type) {
    case actions.GET_CASHIERS_SHIFT_DATA:
      console.log('inside_ShiftList_reducer', action);

      return {
        ...state,
        data: action.data ? action.data : state.data,
      };
    case actions.REFRESH:
      console.log('inside_ShiftList_reducer', action);
      return {...state, refreshing: action.refreshing};
    default:
      return state;
  }
}

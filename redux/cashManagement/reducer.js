import actions from './actions';

const initialState = {
  data: [],
  isModalVisible: false,
  refreshing: false,
  comment: '',
};

export default function cashReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_DATA:
      return {...state, data: action.data};
    case actions.REFRESH:
      return {...state, refreshing: action.refreshing};
    default:
      return state;
  }
}

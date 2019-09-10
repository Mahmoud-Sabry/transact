import actions from './actions';

const initialState = {
  username: '',
  password: '',
  error: '',
  token: 0,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      return {...state, token: action.token};
    case actions.USER:
      return {...state, username: action.username};
    case actions.PASSWORD:
      return {...state, password: action.password};
    default:
      return state;
  }
}

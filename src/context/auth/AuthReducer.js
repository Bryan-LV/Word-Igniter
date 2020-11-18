import AuthTypes from './AuthTypes';

const AuthReducer = function (state, action) {
  switch (action.type) {
    case AuthTypes.SIGN_IN:
      return ({ user: action.payload });
    case AuthTypes.SIGN_OUT:
      return ({ user: null });
    default:
      return state;
  }
}

export default AuthReducer;
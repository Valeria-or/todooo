const initialState = {
login: '',
errMes: '',
auth: false,
};

const UserReducer = (state = initialState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case "REG_USER":
      return { ...state, login: payload.login, auth: true };
    case "LOG_USER":
      return { ...state, login: payload.login, errMes: payload.err, auth: true  };
      case 'LOGOUT_USER':
        return { ...state, auth: payload.auth};
        case 'AUTH_USER':
          return { ...state, auth: payload.auth, login: payload.login};
    default:
      return state;
  }
};

export default UserReducer;
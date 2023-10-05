const initialState = {
login: '',
errMes: ''
};

const UserReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "REG_USER":
      return { ...state, login: payload.login };
    case "LOG_USER":
      return { ...state, login: payload.login, errMes: payload.err };
    default:
      return state;
  }
};

export default UserReducer;
const initialState = {
login: '',
errMes: '',
auth: false
};

const UserReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "REG_USER":
      return { ...state, login: payload.login, auth: true };
    case "LOG_USER":
      return { ...state, login: payload.login, errMes: payload.err, auth: true  };
    default:
      return state;
  }
};

export default UserReducer;
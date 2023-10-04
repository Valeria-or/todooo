const initialState = {
login: ''
};

const UserReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "REG_USER":
      return { ...state, login: payload.login };
    default:
      return state;
  }
};

export default UserReducer;
const intialState = {
  token: null,
};

export default (state = intialState, action) => {
  switch (action.type) {
    case 'MY_TOKEN':
      return {
        ...state,
        token: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        token: null,
      };

    default:
      return state;
  }
};

export const My_Token = token => {
  const data = {
    mytoken: token,
  };
  return async dispatch => {
    dispatch({
      type: 'MY_TOKEN',
      payload: data,
    });
  };
};

export const Log_Out = () => {
  const mydata = {
    mytoken: null,
  };
  return async dispatch => {
    dispatch({
      type: 'LOGOUT',
      payload: mydata,
    });
  };
};

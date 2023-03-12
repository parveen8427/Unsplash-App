import axios from 'axios';
import {my_id} from '../../Services';

export const Get_All_Topics = pageno => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.get(
      `https://api.unsplash.com/topics?page=${pageno}&client_id=${my_id}`,
      config,
    );

    return res;
  } catch (err) {
    console.log('job error->', err);
  }
};

export const Get_All_Photos = number => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.get(
      `https://api.unsplash.com/photos?page=${number}&client_id=${my_id}`,
      config,
    );

    return res;
  } catch (err) {
    console.log('job error->', err);
  }
};

export const Search_Photos = search => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.get(
      `https://api.unsplash.com/search/photos?page=1&query=${search}&client_id=${my_id}`,
      config,
    );

    return res;
  } catch (err) {
    console.log('job error->', err);
  }
};

export const Get_My_Topis = (topic, count) => async dispatch => {
  console.log('----', topic);
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.get(
      `https://api.unsplash.com/topics/${topic}/photos?page=${count}&client_id=${my_id}`,
      config,
    );

    return res;
  } catch (err) {
    console.log('job error->', err);
  }
};

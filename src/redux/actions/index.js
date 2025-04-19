// userActions.js

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = "LOGOUT";

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (userData) => ({
  type: LOGIN_SUCCESS,
  payload: userData,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const login = (username, password) => async (dispatch) => {
  dispatch(loginRequest());

  try {
    const response = await fetch('http://147.93.106.185:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODAzM2M4NTM2M2U4NGMwOThkMDk4MjQiLCJ1c2VybmFtZSI6InN1cGVyYWRtaW4iLCJyb2xlIjoic3VwZXJfYWRtaW4iLCJpYXQiOjE3NDUwNTgxMjksImV4cCI6MTc0NTE0NDUyOX0.taWBLegI8nAb9Zpx8uK_wOL8YeMExauW-q4O_jnrzxE',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('Failed to login. Please try again.');
    }

    const data = await response.json();

    if (data?.message === 'Invalid credentials') {
      dispatch(loginFailure('Invalid credentials'));
    } else if (data?.message === 'Login successful') {
      // Store user data and token in localStorage
      localStorage.setItem('userData', JSON.stringify(data?.data));
      localStorage.setItem('userToken', data?.data?.token);

      dispatch(loginSuccess(data?.data));
    } else {
      dispatch(loginFailure('Something went wrong, please try again.'));
    }
  } catch (error) {
    dispatch(loginFailure('Server error. Please try again later.'));
  }
};


// Logout action
export const logout = () => {
  return (dispatch) => {
    // Remove user data and token from localStorage
    localStorage.removeItem("userData");
    localStorage.removeItem("userToken");

    // Dispatch logout action to clear user data from the Redux store
    dispatch({
      type: LOGOUT,
    });
  };
};

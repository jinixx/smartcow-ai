import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authAPI } from './authAPI';

const initialState = {
  user: null,
  status: 'idle',
  error: null
};

export const loginRequest = createAsyncThunk(
  'auth/loginRequest',
  async ({ user, pass }, { dispatch, rejectWithValue }) => {
    const response = await authAPI.login(user, pass);
    return response.data;
  }
);

export const logoutRequest = createAsyncThunk(
  'auth/logoutRequest',
  async ({ token }, { dispatch, rejectWithValue }) => {
    const response = await authAPI.logout(token);
    return response.data;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // loginSuccess: (state) => {
    //   state.value += 1;
    // },
    // loginFailure: (state) => {
    //   state.value -= 1;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginRequest.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginRequest.fulfilled, (state, action) => {
        const { id, avatar, token } = action.payload;
        state.status = 'idle';
        state.user = {
          id,
          avatar,
          token
        };
        state.error = null;
      })
      .addCase(loginRequest.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error;
      })
      .addCase(logoutRequest.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(logoutRequest.fulfilled, (state, action) => {
        // const { id } = action.payload;
        state.status = 'idle';
        state.user = null;
        state.error = null;
      })
      .addCase(logoutRequest.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error;
      });
  },
});

// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const selectUser = state => state.auth.user;
export const selectAuthStatus = state => state.auth.status;
export const selectAuthError = state => state.auth.error;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

export default authSlice.reducer;

import {createSlice} from '@reduxjs/toolkit';

export const UserSlice = createSlice({
  name: 'user',
  initialState: {
    userData: {},
    login_status: false,
  },
  reducers: {
    setuser(state, action) {
      state.userData = action.payload;
      state.login_status = true;
    },
    clearUser(state, action) {
      state.userData = {};
      state.login_status = false;
    },
  },
});
export const {setuser, clearUser} = UserSlice.actions;

export default UserSlice.reducer;

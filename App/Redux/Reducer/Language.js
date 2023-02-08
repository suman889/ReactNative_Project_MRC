import {createSlice} from '@reduxjs/toolkit';

export const UserSlice = createSlice({
  name: 'language',
  initialState: {
    selectLanguage: "en",
    refrs: false
  },
  reducers: {
    setSelectLanguage(state, action) {
      state.selectLanguage = action.payload;
      state.refrs = !state.refrs
    }
  },
});
export const {setSelectLanguage} = UserSlice.actions;

export default UserSlice.reducer;
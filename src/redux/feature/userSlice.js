import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userSlice",
  initialState: { info: {}, uid: "", loggedIn: false },
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
    setUser: (state, action) => {
      state.info = action.payload;
    },
    setUid: (state, action) => {
      state.uid = action.payload;
    },
    updateUser: (state, action) => {
      state.info = { ...state.info, ...action.payload };
    },
  },
});

export default userSlice;
export const { setUser, setIsLoggedIn, setUid, updateUser } = userSlice.actions;

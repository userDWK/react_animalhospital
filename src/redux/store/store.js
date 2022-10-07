import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../feature/userSlice";

// const userReducer = userSlice.reducer;

const store = configureStore({
  reducer: {
    userData: userSlice.reducer,
  },
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import messageSlice from "../feature/messageSlice";
import userSlice from "../feature/userSlice";

const store = configureStore({
  reducer: {
    userData: userSlice.reducer,
    messageData: messageSlice.reducer,
  },
});

export default store;

import { createSlice } from "@reduxjs/toolkit";

const initialState = { chatUsers: [], loading: false, error: false };

const chatReducer = createSlice({
  name: "chat",
  initialState,
  reducers: {
    saveUser: (state, action) => {
      const { chat } = action.payload;
      state.chatUsers = [...state.chatUsers, chat];
    },
  },
});

export const { saveUser } = chatReducer.actions;
export default chatReducer.reducer;

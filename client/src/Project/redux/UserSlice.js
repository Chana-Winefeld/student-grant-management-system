import { createSlice, current } from "@reduxjs/toolkit";
import { use } from "react";

// שנה את initialState:
const initialState = {
  list: [],
  currentUser: { id: "", password: "", role: "" }, // ← הוסף role
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const exists = state.list.find((user) => user.id === action.payload.id);
      if (!exists) {
        state.list.push(action.payload);
      }
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { addUser, setCurrentUser } = UserSlice.actions;
export default UserSlice.reducer;

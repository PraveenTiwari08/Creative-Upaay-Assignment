import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "Filter", 
  date: "Today", 
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
  },
});

export const { setStatus, setDate } = filterSlice.actions;
export default filterSlice.reducer;

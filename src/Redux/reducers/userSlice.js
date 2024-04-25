import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
};

const userSlice = createSlice({
  name: "counter",
  initialState: {
    list: [],
    tests: [6,2,8,4,5],
  },
  reducers: {

    addList: (state, action) => {
      console.log("Before addList:", state.list);
      state.list.push(action.payload);
      console.log("After addList:", state.list);
    },
    addCard: (state, action) => {
      console.log("action", action, state.list);
      

      state.list.forEach((item) => {
        if (item.id === action.payload.parentId) {
          if (item.hasOwnProperty("children")) {
            item.children.push(action.payload);
          } else {
            item.children = [];
            item.children.push(action.payload);
          }
        }
      });
    },
    deleteList: (state, action) => {
      console.log("called", state)
      const itemIndex = state.list.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex !== -1) {
        state.list.splice(itemIndex, 1)
      }
  
    },
    deleteChildList: (state, action) => {
      const { id, parentId } = action.payload
      const itemIndex = state.list.findIndex(
        (item) => item.id === parentId
      );
      if (itemIndex !== -1) {
        const childItemIndex = state.list[itemIndex].children.findIndex(
          (item) => item.id === id
        );
        if (childItemIndex !== -1) {
          state.list[itemIndex].children.splice(childItemIndex, 1)
        }
      }

    },
    extraReducers: (builder) => {
      builder.addCase(fetchInitialData.fulfilled, (state, action) => {
        // Assuming the fetched data is in the format needed for your chart
        state.chartData = action.payload;
      });
   },
  },
});

export const {
  loginSuccess,
  logout,
  addList,
  addCard,
  deleteChildList,
  extraReducers,
  deleteList } = userSlice.actions;

export default userSlice.reducer;

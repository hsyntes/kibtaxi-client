import { createSlice } from "@reduxjs/toolkit";

function getLocalStorageTheme() {
  let theme;

  if (typeof window !== "undefined")
    theme = localStorage.getItem("theme") || null;

  return theme;
}

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    theme: getLocalStorageTheme(),
  },
  reducers: {
    switchTheme(state, action) {
      const { payload } = action;

      state.theme = payload;

      return state;
    },
  },
});

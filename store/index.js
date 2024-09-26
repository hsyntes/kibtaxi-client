import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./theme/theme.slice";

const store = configureStore({ reducer: { theme: themeSlice } });

export default store;

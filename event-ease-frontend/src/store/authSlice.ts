import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authState } from "@/interfaces/authSliceInterface";
import { userInterface as User } from "@/interfaces/userInterface";

const initialState: authState = {
  token: null,
  user: null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; user: User }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.status = "succeeded";
      state.error = null;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.status = "idle";
      state.error = null;
    },
    setAuthError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.status = "failed";
    },
    setLoading: (state) => {
      state.status = "loading";
      state.error = null;
    },
  },
});

export const { setCredentials, logout, setAuthError, setLoading } =
  authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state: { auth: authState }) =>
  state.auth.user;

export const selectAuthToken = (state: { auth: authState }) => state.auth.token;

export const selectIsLoading = (state: { auth: authState }) =>
  state.auth.status;

export const selectError = (state: { auth: authState }) => state.auth.error;

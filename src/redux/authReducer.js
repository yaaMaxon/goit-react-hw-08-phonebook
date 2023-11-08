import { requestLogin, requestLogout, requestRefreshUser, requestRegister, setToken } from "services/api";
import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (formData, thunkAPI) => {
    try {
      const response = await requestLogin(formData);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  })

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (formData, thunkAPI) => {
    try {
      const authData = await requestRegister(formData);

      return authData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }) 

export const refreshThunk = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;
    try {
      setToken(token);
      const authData = await requestRefreshUser();

      return authData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }, {
    condition: (_, thunkAPI) => {
        const state = thunkAPI.getState();
        const token = state.auth.token;

        if(!token) return false;
        return true;
    },
  })  

export const logOutThunk = createAsyncThunk(
  "auth/logOut",
  async (_, thunkAPI) => {
    try {
      await requestLogout();

      return;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }) 

const INITIAL_STATE = { 
    token: null,
    user: {
      email: null,
      name: null,
    },
    authenticated: false,
    isLoading: false,
    error: null
}

const authSlice = createSlice({
  // Ім'я слайсу
  name: "auth",
  // Початковий стан редюсера слайсу
  initialState: INITIAL_STATE,
  // Об'єкт редюсерів

  extraReducers: builder => builder
    /**
      |============================
      | Register User
      |============================
    */
    .addCase(registerThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.authenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
    })
        /**
      |============================
      | Login User
      |============================
    */
    .addCase(loginThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.authenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
    })
        /**
      |============================
      | Refresh User
      |============================
    */
    .addCase(refreshThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.authenticated = true;
      state.user = action.payload;
    })
        /**
      |============================
      | LogOut User
      |============================
    */
    .addCase(logOutThunk.fulfilled, () => {
      return INITIAL_STATE;
    })
    .addMatcher(isAnyOf(
        logOutThunk.pending, 
        registerThunk.pending, 
        loginThunk.pending, 
        refreshThunk.pending), 
      state => {
        state.isLoading = true;
        state.error = null;
    })
    .addMatcher(isAnyOf(        
        logOutThunk.rejected, 
        registerThunk.rejected, 
        loginThunk.rejected, 
        refreshThunk.rejected), (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
});

// Редюсер слайсу
export const authReducer = authSlice.reducer;
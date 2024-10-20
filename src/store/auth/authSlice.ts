import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { registerUser, loginUser, logoutUser } from './authThunks'; // Импортируем thunks

export type TReceivedUser = {
  email: string;
  _id: string;
  firstName: string;
  lastName: string;
  phone: number;
  company: string;
}


type TAuthState = {
  isAuthenticated: boolean;
  user: TReceivedUser | null ;
  loading: boolean;
  error: string | null;
};

const initialState: TAuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    const handlePending = (state: TAuthState) => {
      state.loading = true;
      state.error = null; // Сбрасываем ошибку
    };

    const handleFulfilled = (state: TAuthState, action: PayloadAction<TReceivedUser>) => {
      state.loading = false; // Завершаем загрузку
      state.user = action.payload; // Устанавливаем пользователя
      state.isAuthenticated = true;
    };

    const handleRejected = (state: TAuthState, action: PayloadAction<any>) => {
      state.error = action.payload;
      state.loading = false; // Завершаем загрузку
    };

    builder
    .addCase(registerUser.pending, handlePending)
    .addCase(registerUser.fulfilled, handleFulfilled)
      .addCase(registerUser.rejected, handleRejected) // Обновлено
      .addCase(loginUser.pending, handlePending)
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false; // Завершаем загрузку
        state.user = action.payload; // Устанавливаем пользователя
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, handleRejected) // Обновлено
      .addCase(logoutUser.pending, handlePending)
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false; // Завершаем загрузку
        state.user = null; // Устанавливаем пользователя в null при выходе
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, handleRejected);
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;

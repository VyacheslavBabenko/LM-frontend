import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { domain } from 'shared/constants';
import { addNotify } from 'store/notify/notifySlice';
import { TReceivedUser } from './authSlice';

export type TUser = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: number;
  company: string;
};

export type TValidationErrors = {
  errorMessage: string;
  field_errors: Record<string, string>;
};

// Функция для регистрации пользователя
export const registerUser = createAsyncThunk<
TReceivedUser | null, // Тип возвращаемого значения
  TUser // Тип аргумента
>('auth/registerUser', async (userData, { dispatch, rejectWithValue }) => {
  try {
    const response = await axios.post(`${domain}/api/auth/register`, userData, {
      withCredentials: true,
    });

    await loginUser({ email: userData.email, password: userData.password });

    dispatch(addNotify({ text: 'Success!', type: 'success' }));
    return response.data; // Возвращаем данные пользователя
  } catch (error) {
    // Уточняем тип ошибки
    const err = error as AxiosError;

    dispatch(
      addNotify({
        text: err.response?.data ? (err.response?.data as string) : 'Error',
        type: 'error',
      })
    );

    return rejectWithValue(err.response?.data as string);
  }
});

// Функция для логина пользователя
export const loginUser = createAsyncThunk<
  TUser | null, // Тип возвращаемого значения
  {
    email: string;
    password: string;
  } // Тип аргумента
>('auth/loginUser', async (credentials, { dispatch, rejectWithValue }) => {
  // const navigate = useNavigate();

  try {
    const response = await axios.post<TUser>(`${domain}/api/auth/login`, credentials, {
      withCredentials: true,
    });
    // navigate('/');
    return response.data; // Возвращаем данные пользователя
  } catch (error) {
    // Уточняем тип ошибки
    const err = error as AxiosError;

    dispatch(
      addNotify({
        text: err.response?.data ? (err.response?.data as string) : 'Error',
        type: 'error',
      })
    );

    return rejectWithValue(err.response?.data as string);
  }
});

// Функция для логаута пользователя
export const logoutUser = createAsyncThunk<
  void, // Тип возвращаемого значения (нет данных)
  void, // Тип аргумента (нет данных)
  { rejectValue: TValidationErrors } // Тип для rejectWithValue
>('auth/logoutUser', async (_, { dispatch }) => {
  try {
    const response = await axios.post(
      `${domain}/api/auth/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    // window.location.pathname = "/";
    return response.data; // Возвращаем результат выхода
  } catch (error) {
    // Уточняем тип ошибки
    const err = error as AxiosError;

    dispatch(
      addNotify({
        text: err.response?.data ? (err.response?.data as string) : 'Error',
        type: 'error',
      })
    );
  }
});

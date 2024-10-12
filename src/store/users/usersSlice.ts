import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { domain } from "shared/constants";

// Асинхронный thunk для получения всех пользователей
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
	const response = await axios.get(`${domain}/api/users`, {
		withCredentials: true,
	}); // Запрос на бэкенд для получения пользователей
	return response.data;
});

const usersSlice = createSlice({
	name: "users",
	initialState: {
		users: [],
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUsers.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchUsers.fulfilled, (state, action) => {
				state.loading = false;
				state.users = action.payload; // Сохраняем полученных пользователей в стейте
			})
			.addCase(fetchUsers.rejected, (state) => {
				state.loading = false;
			});
	},
});

export default usersSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { domain } from "shared/constants";
import {
	ReceivedLeadsState,
	FetchReceivedLeadsParams,
	FetchReceivedLeadsResponse,
} from "./types";

const initialState: ReceivedLeadsState = {
	leads: [],
	count: 0,
	loading: false,
	error: null,
	refetch: false,
};

// Создаем асинхронный thunk для получения переданных лидов
export const fetchReceivedLeads = createAsyncThunk<
	FetchReceivedLeadsResponse,
	FetchReceivedLeadsParams
>("receivedLeads/fetchReceivedLeads", async (params) => {
	const response = await axios.get(`${domain}/api/leads/received-leads`, {
		withCredentials: true,
		params,
	});
	return response.data;
});

// Создаем слайс
const receivedLeadsSlice = createSlice({
	name: "receivedLeads",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchReceivedLeads.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchReceivedLeads.fulfilled, (state, action) => {
				state.loading = false;
				state.leads = action.payload.leads;
				state.count = action.payload.count;
			})
			.addCase(fetchReceivedLeads.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || "Ошибка при загрузке лидов";
			});
	},
});

// Экспортируем редюсер
export default receivedLeadsSlice.reducer;

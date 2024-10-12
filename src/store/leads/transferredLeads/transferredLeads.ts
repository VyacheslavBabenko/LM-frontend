import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { domain } from "shared/constants";

// Определяем типы для лида
interface Lead {
	_id: string;
	sender: string;
	recipient: string;
	firstName: string;
	lastName: string;
	phone: string;
	country: string;
	details: string;
	purchaseTimeframe: string;
	budget: string;
	installment: boolean;
	comments: string;
	status: number;
}

// Определяем начальное состояние
interface TransferredLeadsState {
	leads: Lead[];
	loading: boolean;
	error: string | null;
}

const initialState: TransferredLeadsState = {
	leads: [],
	loading: false,
	error: null,
};

// Создаем асинхронный thunk для получения переданных лидов
export const fetchTransferredLeads = createAsyncThunk<Lead[], void>(
	"transferredLeads/fetchTransferredLeads",
	async () => {
		const response = await axios.get(`${domain}/api/leads/transferred-leads`, {
			withCredentials: true,
		});
		return response.data;
	}
);

// Создаем слайс
const transferredLeadsSlice = createSlice({
	name: "transferredLeads",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTransferredLeads.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchTransferredLeads.fulfilled, (state, action) => {
				state.loading = false;
				state.leads = action.payload;
			})
			.addCase(fetchTransferredLeads.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || "Ошибка при загрузке лидов";
			});
	},
});

// Экспортируем редюсер
export default transferredLeadsSlice.reducer;

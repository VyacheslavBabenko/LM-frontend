import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { domain } from "shared/constants";

export const transferLead = createAsyncThunk(
	"leads/transferLead",
	async (info: unknown) => {
		const response = await axios.post(`${domain}/api/leads/create-lead`, info, {
			withCredentials: true,
		});
		return response.data;
	}
);
type TTransferLeadSlice = {
	loading: boolean;
	error: string | null;
};

const initialState: TTransferLeadSlice = {
	loading: false,
	error: null,
};

const transferLeadSlice = createSlice({
	name: "transferLead",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(transferLead.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(transferLead.fulfilled, (state) => {
				state.loading = false;
			})
			.addCase(transferLead.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || "Error";
			});
	},
});

export default transferLeadSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type INotifyTypes = "success" | "error" | "default";

type TNotification = {
	id?: string;
	text: string;
	type?: INotifyTypes;
	needClose?: boolean;
};

// type TNotificationAdd = Omit<TNotification, 'id' | 'needClose'>;

type TNotifyState = {
	notifications: TNotification[];
};

const initialState: TNotifyState = {
	notifications: [],
};

const notifySlice = createSlice({
	name: "notify",
	initialState,
	reducers: {
		addNotify: (state, action: PayloadAction<TNotification>) => {
			const notification = {
				id: new Date().toISOString(),
				text: action.payload.text,
				type: action.payload.type || "default",
				needClose: action.payload.needClose || true,
			};

			state.notifications.push(notification);
		},
		deleteNotify: (state, action: PayloadAction<{ id: string }>) => {
			state.notifications = state.notifications.filter(
				(notification) => notification.id !== action.payload.id
			);
		},
	},
});

export const { addNotify, deleteNotify } = notifySlice.actions;
export default notifySlice.reducer;

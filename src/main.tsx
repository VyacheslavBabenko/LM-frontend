"use strict";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import store, { persistor } from "./store/store";
import App from "./App.tsx";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

const adminUrl =
	process.env.NODE_ENV === "production"
		? window.location.pathname.split("/")[1]
		: "";



createRoot(document.getElementById("root")!).render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<BrowserRouter basename={`/${adminUrl}`}>
				<App />
			</BrowserRouter>
		</PersistGate>
	</Provider>
);

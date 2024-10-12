import { BrowserRouter, Route, Routes } from "react-router-dom";

import SignIn from "./features/auth/view/desktop/SignIn";
import SignUp from "./features/auth/view/desktop/SignUp";
import HomePage from "features/homePage/view/desktop/HomePage";
import TransferLead from "features/transferLead/view/desktop/TransferLead";

interface ProtectedRouteProps {
	isAuth: boolean;
	children: JSX.Element;
}

const ProtectedRoute = ({ isAuth, children }: ProtectedRouteProps) => {
	return isAuth ? children : <SignIn />;
};

export const AppRoutes = ({ isAuth }: { isAuth: boolean }) => (
	<Routes>
		<Route
			path="/"
			element={
				<ProtectedRoute isAuth={isAuth}>
					<HomePage />
				</ProtectedRoute>
			}
		/>
		<Route
			path="/transfer-lead"
			element={
				<ProtectedRoute isAuth={isAuth}>
					<TransferLead />
				</ProtectedRoute>
			}
		/>
		{!isAuth && (
			<>
				<Route path="/login" element={<SignIn />} />
				<Route path="/register" element={<SignUp />} />
			</>
		)}
	</Routes>
);

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import SignIn from "./features/auth/view/desktop/SignIn";
import SignUp from "./features/auth/view/desktop/SignUp";
import HomePage from "features/homePage/view/desktop/HomePage";
import TransferLead from "features/transferLead/view/desktop/TransferLead";
import TransferredLeads from "features/transferredLeads/view/desktop/TransferredLeads";

interface ProtectedRouteProps {
  isAuth: boolean;
  children: JSX.Element;
}

const ProtectedRoute = ({ isAuth, children }: ProtectedRouteProps) => {
  return isAuth ? children : <Navigate to="/login" replace />;
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
    <Route
      path="/transferred-leads"
      element={
        <ProtectedRoute isAuth={isAuth}>
          <TransferredLeads />
        </ProtectedRoute>
      }
    />
    {!isAuth ? (
      <>
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </>
    ) : (
      <Route path="*" element={<Navigate to="/" replace />} />
    )}
  </Routes>
);

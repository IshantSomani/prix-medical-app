import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./context/ProtectedRoute";
import { PublicRoute } from "./context/PublicRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import PatientForm from "./pages/PatientForm";
import PageNotFound from "./pages/PageNotFound ";


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />

          <Route path="/signup" element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          } />

          <Route path="/home" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          
          <Route path="/patients/new" element={
            <ProtectedRoute>
              <PatientForm />
            </ProtectedRoute>
          } />

          <Route path="/" element={
            <PublicRoute>
              <Navigate to="/login" replace />
            </PublicRoute>
          } />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
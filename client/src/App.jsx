import { React } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import ProvidersListPage from './pages/ProvidersListPage';
import ProviderDetailPage from './pages/ProviderDetailPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/providers" element={<ProvidersListPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/provider/:id" element={<ProviderDetailPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App;

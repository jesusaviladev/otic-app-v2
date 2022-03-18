import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import NotFound from './pages/NotFound.jsx';
import { AuthContextProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() {
	return (
		<>
			<AuthContextProvider>
				<Routes>
					<Route path="/" element={<LandingPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route element={<ProtectedRoute />}>
						<Route path="/dashboard" element={<Dashboard />} />
					</Route>
					<Route path="*" element={<NotFound />} />
				</Routes>
			</AuthContextProvider>
		</>
	);
}

export default App;

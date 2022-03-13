import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {
	return (
		<>
			<Routes>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="*" element={<NotFound />}></Route>
			</Routes>
		</>
	);
}

export default App;

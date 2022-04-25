import { Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import NotFound from './pages/NotFound.jsx';
import Home from './pages/Home.jsx';
import Requests from './pages/Requests.jsx';
import Reports from './pages/Reports.jsx';
import Devices from './pages/Devices.jsx';
import Users from './pages/Users.jsx';
import UserRequests from './pages/UserRequests.jsx';
import UserReports from './pages/UserReports.jsx';
import RequestDetails from './pages/RequestDetails.jsx';
import UserDetails from './pages/UserDetails.jsx';
import DeviceDetails from './pages/DeviceDetails.jsx';
import ReportDetails from './pages/ReportDetails.jsx';
import ReportsForm from './components/ReportsForm.jsx';

function App() {
	return (
		<>
			<ScrollToTop>
				<AuthContextProvider>
					<Routes>
						<Route path="/" element={<LandingPage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route element={<ProtectedRoute redirectPath="/login" />}>
							<Route path="/dashboard" element={<Dashboard />}>
								<Route path="/dashboard/" element={<Home />} />
								<Route
									path="/dashboard/solicitudes"
									element={<UserRequests />}
								/>
								<Route
									path="/dashboard/solicitudes/:id"
									element={<RequestDetails />}
								/>
								<Route
									path="/dashboard/solicitudes/:requestId/reporte"
									element={<ReportsForm />}
								/>
								<Route path="/dashboard/reportes" element={<UserReports />} />
								<Route path="/dashboard/equipos" element={<Devices />} />
								<Route
									path="/dashboard/equipos/:serial"
									element={<DeviceDetails />}
								/>
							</Route>
						</Route>
						<Route element={<ProtectedRoute redirectPath="/" role="admin" />}>
							<Route path="/admin" element={<Dashboard />}>
								<Route path="/admin/" element={<Home />} />
								<Route path="/admin/solicitudes" element={<Requests />} />
								<Route
									path="/admin/solicitudes/:id"
									element={<RequestDetails />}
								/>
								<Route path="/admin/reportes" element={<Reports />} />
								<Route path="/admin/reportes/:id" element={<ReportDetails />} />
								<Route path="/admin/usuarios" element={<Users />} />
								<Route path="/admin/usuarios/:id" element={<UserDetails />} />
								<Route path="/admin/equipos" element={<Devices />} />
								<Route
									path="/admin/equipos/:serial"
									element={<DeviceDetails />}
								/>
							</Route>
						</Route>
						<Route path="*" element={<NotFound />} />
					</Routes>
				</AuthContextProvider>
			</ScrollToTop>
		</>
	);
}

export default App;

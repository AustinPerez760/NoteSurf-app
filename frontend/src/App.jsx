import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from 'react-router-dom';
import Home from './pages/Home/Home';
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login';

// Define the Root component to handle the initial redirect
const Root = () => {
	// Check if token exists in localStorage
	const isAuthenticated = !!localStorage.getItem('token');

	// Redirect to dashboard if authenticated, otherwise to login
	return isAuthenticated ? (
		<Navigate to='/dashboard' />
	) : (
		<Navigate to='/login' />
	);
};

function App() {
	return (
		<div>
			<Router>
				<Routes>
					<Route path='/' element={<Root />} />
					<Route path='/dashboard' exact element={<Home />} />
					<Route path='/login' exact element={<Login />} />
					<Route path='/signUp' exact element={<SignUp />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;

import Navbar from '../../compnents/Navbar';
import PasswordInput from '../../compnents/Inputs/PasswordInput';
import axiosInstance from '../../utils/axiosinstance';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { validateEmail } from '../../utils/helper';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);

	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();

		if (!validateEmail(email)) {
			setError('Please enter a valid email address');
			return;
		}

		if (!password) {
			setError('Please enter a password');
			return;
		}

		setError('');

		// Login API CALL
		try {
			const response = await axiosInstance.post('/login', {
				email: email,
				password: password,
			});

			// Handle successful login response
			if (response.data && response.data.accessToken) {
				localStorage.setItem('token', response.data.accessToken);
				navigate('/dashboard');
			}
		} catch (error) {
			// Handle login error
			if (
				error.response &&
				error.response.data &&
				error.response.data.message
			) {
				setError(error.response.data.message);
			} else {
				setError('An unexpected error occurred. Please try again.');
			}
		}
	};

	return (
		<>
			<Navbar />

			<div className='flex items-center justify-center mt-28'>
				<div className='w-96 border round bg-white px-7 py-10'>
					<form onSubmit={handleLogin}>
						<h4 className='text-2xl mb-7 text-blue-400'>Login</h4>
						<input
							type='text'
							placeholder='email'
							className='input-box'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>

						<PasswordInput
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>

						{error && <p className='text-red-500 pb-1'>{error}</p>}

						<button
							type='submit'
							className='btn-primary bg-teal-100 cursor-hover hover:bg-teal-200 w-full mt-5 cursor-pointer '>
							Login
						</button>

						<p className='text-sm text-center my-4'>
							Not registerd yet?{' '}
							<Link
								to='/signup'
								className='font-medium text-blue-800 underline '>
								Create an account
							</Link>
						</p>
					</form>
				</div>
			</div>
		</>
	);
};
export default Login;

import Navbar from '../../compnents/Navbar';
import { useState } from 'react';
import PasswordInput from '../../compnents/Inputs/PasswordInput';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosinstance';

const SignUp = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);

	const navigate = useNavigate();

	const handleSignUp = async (e) => {
		e.preventDefault();

		if (!name) {
			setError('Please enter your name');
			return;
		}

		if (!validateEmail(email)) {
			setError('Please enter a valid email address');
			return;
		}

		if (!password) {
			setError('Please enter a password');
			return;
		}

		setError('');

		// SignUp API CALL

		try {
			const response = await axiosInstance.post('/create-account', {
				fullName: name,
				email: email,
				password: password,
			});

			// Handle successful registration response
			if (response.data && response.data.error) {
				setError(response.data.message);
				return;
			}

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
					<form onSubmit={handleSignUp}>
						<h4 className='text-2xl mb-7 text-blue-400'>SignUp</h4>

						<input
							type='text'
							placeholder='Name'
							className='input-box text-slate-500 border-gray-500'
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>

						<input
							type='text'
							placeholder='Email'
							className='input-box text-slate-500 border-gray-500'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>

						<PasswordInput
							className='text-slate-500 border-gray-500'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>

						{error && <p className='text-red-500 pb-1'>{error}</p>}

						<button
							type='submit'
							className='btn-primary bg-teal-100 cursor-hover hover:bg-teal-200 w-full mt-5 cursor-pointer'>
							Create an Account
						</button>

						<p className='text-sm text-center my-4'>
							Not registerd yet?{' '}
							<Link
								to='/login'
								className='font-medium text-blue-800 underline '>
								Login
							</Link>
						</p>
					</form>
				</div>
			</div>
		</>
	);
};

export default SignUp;

import React, { useState } from "react";
import loginFormSvg from '../../assets/svg/login.svg'
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";


function LoginForm() {
	const { user, loading, error, login } = useAuth();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const  navigate = useNavigate()
	const handleSubmit = (e) => {
		e.preventDefault();
		login(email, password);
		navigate('/dashboard')
	};

	return (
		<>
			<div class="bg-gray-100 flex justify-center items-center h-screen">
				{/* <!-- Left: Image --> //class="w-1/2 h-screen hidden lg:block" */}
				<div class="w-1/2 h-screen">
					<img
						src={loginFormSvg}
						alt="Placeholder Image"
						class="object-cover w-full h-full"
					/>
				</div>
				{/* <!-- Right: Login Form --> */}
				<div class="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
					<h1 class="text-2xl font-semibold mb-4">Login</h1>
					<form action="#" method="POST" onSubmit={handleSubmit}>
						{/* <!-- Username Input --> */}
						<div class="mb-4">
							<label htmlFor="username" class="block text-gray-600">
								Username
							</label>
							<input
								type="text"
								id="username"
								name="username"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
								autocomplete="off"
							/>
						</div>
						{/* <!-- Password Input --> */}
						<div class="mb-4">
							<label htmlFor="password" class="block text-gray-600">
								Password
							</label>
							<input
								type="password"
								id="password"
								name="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
								autocomplete="off"
							/>
						</div>
						{/* <!-- Remember Me Checkbox --> */}
						<div class="mb-4 flex items-center">
							<input
								type="checkbox"
								id="remember"
								name="remember"
								class="text-blue-500"
							/>
							<label htmlFor="remember" class="text-gray-600 ml-2">
								Remember Me
							</label>
						</div>
						{/* <!-- Forgot Password Link --> */}
						<div class="mb-6 text-blue-500">
							<a href="#" class="hover:underline">
								Forgot Password?
							</a>
						</div>
						{/* <!-- Login Button --> */}
						<button
							type="submit"
							// to="/dashboard"
							class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
						>

							Login
						</button>
					</form>
					{/* <!-- Sign up  Link --> */}
					<div class="mt-6 text-blue-500 text-center">
						{/* <a href="#" class="hover:underline">
              Sign up Here
            </a> */}
						<Link to="/signup" className="hover:underline">
							Sign up Here
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}

export default LoginForm;

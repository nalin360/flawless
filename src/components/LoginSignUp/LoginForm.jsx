import React, { useState } from "react";
import loginFormSvg from '../../assets/svg/login.svg'
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function LoginForm() {
  const { user, loading, error, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      // Handle login errors here (e.g., display an error message)
    }
  };

  return (
    <>
      <div className="bg-gray-100 flex justify-center items-center h-screen">
        {/* Left: Image */}
        <div className="w-1/2 h-screen hidden lg:block">
          <img
            src={loginFormSvg}
            alt="Placeholder Image"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right: Login Form */}
        <div className="lg:p-36 md:p-52 sm:p-20 p-8 w-full lg:w-1/2">
          <h1 className="text-2xl font-semibold mb-4">Login</h1>
          <form onSubmit={handleSubmit}>
            {/* Username Input */}
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-600">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
              />
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-600">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
              />
            </div>

            {/* Remember Me Checkbox (optional) */}
            {/*<div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                className="text-blue-500"
              />
              <label htmlFor="remember" className="text-gray-600 ml-2">
                Remember Me
              </label>
            </div>*/}

            {/* Forgot Password Link */}
            <div className="mb-6 text-blue-500">
              <Link to="/forgot-password" className="hover:underline">
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
            >
              Login
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-blue-500 text-center">
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

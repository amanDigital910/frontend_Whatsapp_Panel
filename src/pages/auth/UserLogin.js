import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BgImage from '../../assets/loginbg.webp';
import socialmedia from '../../assets/Social media-amico (2).png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const UserLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName: username, password }),
      });

      const data = await response.json();

      if (data?.message === 'Invalid credentials') {
        setError("Invalid credentials");
      } else if (data?.message === 'Login successful') {
        // Store user data and token in localStorage
        localStorage.setItem("userData", JSON.stringify(data?.data));
        localStorage.setItem("userToken", data?.data?.token);

        // Navigate based on user role
        const userRole = data?.data?.user?.role;
        if (userRole === 'superAdmin' || userRole === 'admin') {
          navigate("/AdminDashboard");
        } else {
          navigate("/dashboard");
        }
      } else {
        setError("Something went wrong, please try again.");
      }

      setLoading(false);

    } catch (err) {
      setLoading(false);
      setError('Server error. Please try again later.');
    }
  };

  return (
    <section
      className="relative flex gap-20 items-center justify-center min-h-screen bg-cover bg-center"
    // style={{ backgroundImage: `url(${BgImage})` }}
    >
      {/* Black Overlay */}
      <div className="absolute inset-0 bg-gray-200 opacity-60"></div>
      <div>
        <img src={socialmedia} alt="social media" height="auto" width="500px" style={{
          filter: "drop-shadow(4px 4px 6px rgba(0, 0, 0, 0.3))",
        }} />
      </div>
      {/* Login Form */}
      <div className="relative z-10  w-[35%] bg-white rounded-lg shadow-lg p-8 py-16">
        <h2 className="text-4xl font-bold text-center mb-6 text-gray-900">Login</h2>
        <form onSubmit={handleLogin}>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Username / Email Field */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="username">
              User Name
            </label>
            <input
              className="shadow-sm appearance-none border border-gray-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="username"
              type="text"
              placeholder="Enter your user name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Password Field */}
          <div className="mb-6 relative">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
              Password
            </label>

            <input
              className="shadow-sm appearance-none border border-gray-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Icon for toggling password visibility */}
            <div
              className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer mt-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </div>
          </div>


          {/* Submit Button */}
          <div className="w-full">
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-bold fs-5 py-3 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UserLogin;

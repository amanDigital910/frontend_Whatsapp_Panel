import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BgImage from '../../assets/loginbg.webp';
import socialmedia from '../../assets/whatsApp_Panel_Login_Background_5.jpg';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import usernameSvgLogo from '../../assets/icons/username-svg-logo.svg'
import passwordSvgLogo from '../../assets/icons/password-svg-logo.svg'

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
    <div className="relative flex items-center justify-center min-h-screen w-full bg-cover bg-center px-4">
      {/* Background Image */}
      <img
        src={socialmedia}
        alt="social media background"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />

      {/* Overlay */}
      {/* <div className="absolute top-0 left-0 w-full h-full z-10" /> */}

      {/* Login Box */}
      <div className="relative z-20 w-full max-w-lg bg-[#e0dada] bg-opacity-40 backdrop-blur-sm rounded-lg  shadow-[10px_20px_60px_rgba(0,0,0,0.9)] m-4 p-8 ">
        {/* <h2 className="text-4xl font-bold text-center mb-6 text-black">Login</h2> */}
        <form onSubmit={handleLogin}>
          {error && (
            <p className="text-[#ff2a2a] text-2xl mb-4 font-bold">{error}</p>
          )}

          {/* Username */}
          <div className="mb-6">
            <label
              className="block text-black md:text-lg text-xl mb-2 font-bold"
              htmlFor="username"
            >
              User Name
            </label>
            <div className="shadow-sm flex flex-row appearance-none rounded-lg w-full py-3 pl-3 gap-3
            text-black leading-tight bg-white border-4 border-gray-300 hover:border-[#120d50] 
            focus-within:border-[#120d50] focus-within:outline-[#120d50]">
              <img alt="Username Logo" className="w-8 h-8" src={usernameSvgLogo} />
              <input
                className="w-full pr-3 border-none bg-transparent focus:outline-none text-gray-700 md:text-xl text-2xl"
                id="username"
                type="text"
                placeholder="Enter your user name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-6 relative">
            <label className="block text-black md:text-lg text-xl mb-2 font-bold"
              htmlFor="password"
            >
              Password
            </label>
            <div className="shadow-sm flex items-center flex-row appearance-none rounded-lg w-full py-3 pl-3 pr-3 gap-3
            text-black leading-tight bg-white border-4 border-gray-300 hover:border-[#120d50] 
            focus-within:border-[#120d50] focus-within:outline-[#120d50]">
              <img alt="Password Logo" className="w-8 h-8" src={passwordSvgLogo} />
              <input
                className="w-full border-none bg-transparent focus:outline-none text-gray-700 md:text-xl text-2xl"
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="w-full">
            <button
              className="bg-green-600 hover:bg-green-700 text-black font-bold py-3 px-4 rounded focus:outline-none focus:ring-2 focus:ring-[#120d50] w-full md:text-lg text-xl"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>

  );
};

export default UserLogin;

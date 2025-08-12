import React, { useState, useEffect, useContext } from 'react';
import { StoreContext } from '../context/storecontext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = ({ setShowLogin }) => {
  const [currentState, setCurrentState] = useState('Login');
  const { url, token, setToken } = useContext(StoreContext);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newUrl = url;

    if (currentState === 'Login') {
      newUrl += "api/user/login";
    } else {
      newUrl += "api/user/register";
    }

    try {
      const response = await axios.post(newUrl, data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
        toast.success(
          currentState === 'Login'
            ? "Login successful!"
            : "Registration successful!"
        );
      } else {
        toast.error(response.data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Auth Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    // For debugging
    // console.log(data);
  }, [data]);

  const toggleState = () => {
    setCurrentState(currentState === 'Login' ? 'Sign-Up' : 'Login');
    setData({
      name: "",
      email: "",
      password: ""
    });
  };

  return (
    <div className="bg-white rounded-2xl p-8 w-[90%] max-w-md shadow-xl relative">
      <button
        onClick={() => setShowLogin(false)}
        className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl"
        type="button"
      >
        ✕
      </button>

      <h2 className="text-2xl font-bold mb-6 text-center">
        {currentState === 'Login' ? 'Login to Your Account' : 'Create a New Account'}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {currentState === 'Sign-Up' && (
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            value={data.name}
            onChange={handleOnChange}
            className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={data.email}
          onChange={handleOnChange}
          className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={data.password}
          onChange={handleOnChange}
          className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        <button
          type="submit"
          className="bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition duration-300"
        >
          {currentState === 'Login' ? 'Login' : 'Sign Up'}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-4">
        {currentState === 'Login'
          ? "Don’t have an account?"
          : "Already have an account?"}{' '}
        <span
          onClick={toggleState}
          className="text-orange-500 cursor-pointer font-medium"
        >
          {currentState === 'Login' ? 'Sign Up' : 'Login'}
        </span>
      </p>
    </div>
  );
};

export default Login;
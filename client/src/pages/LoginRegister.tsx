import React, { useState } from "react";
import { loginUser, registerUser } from "../sources/loginServices";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const LoginRegister: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate()

  const handleLogin = async (email: string, password: string) => {
    try {
      const USER = await loginUser(email, password);

      if (!USER.token) {
        setMessage("No token received from server");
        return;
      }

      // Save token immediately
      localStorage.setItem("token", USER.token);
      toast.success("Login Successful")
      setMessage("Login successful!");
      navigate('/')
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Login failed!");
    }
  };

  const handleRegister = async (name: string, email: string, password: string) => {
    try {
      const USER = await registerUser(name, email, password);

      if (!USER.token) {
        setMessage("Registration failed: No token received");
        return;
      }

      // Save token immediately
      localStorage.setItem("token", USER.token);

      toast.success("Registration successful!");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Registration failed!");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister) {
      handleRegister(name, email, password);
    } else {
      handleLogin(email, password);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-6">
      {/* Login/Register Card */}
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-10">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
          {isRegister ? "Create Account" : "Welcome Back"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {isRegister && (
            <div className="flex flex-col">
              <label className="mb-2 font-semibold text-gray-700">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-800"
              />
            </div>
          )}
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-800"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-800"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold rounded-xl shadow-md hover:from-blue-600 hover:to-indigo-600 transition-all"
          >
            {isRegister ? "Sign Up" : "Login"}
          </button>
        </form>
        <p
          className="mt-6 text-center text-sm text-gray-500 cursor-pointer hover:underline"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister
            ? "Already have an account? Login"
            : "Don't have an account? Sign Up"}
        </p>
      </div>
    </div>
  );
};

export default LoginRegister;

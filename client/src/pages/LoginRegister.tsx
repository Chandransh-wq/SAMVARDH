import React, { useState } from "react";
import { loginUser, registerUser } from "../sources/loginServices";
import { getNotebooks, type Notebook } from "../sources/notebookServices";

const LoginRegister: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isRegister) {
        const res = await registerUser(name, email, password);
        setMessage(`Registered: ${res.newUser}`);
      } else {
        const res = await loginUser(email, password);
        setMessage(`Logged in as: ${res.user.name}`);

        // Fetch notebooks AFTER login
        const userNotebooks = await getNotebooks(); // backend uses JWT to filter by user
        setNotebooks(userNotebooks); // store actual Notebook array
      }
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Error occurred");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Login/Register Form */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mb-6">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isRegister ? "Register" : "Login"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
          >
            {isRegister ? "Register" : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            className="text-blue-500 font-medium hover:underline"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? "Login" : "Register"}
          </button>
        </p>

        {message && (
          <p className="mt-4 text-center text-red-500 font-medium">{message}</p>
        )}
      </div>

      {/* Display Notebooks */}
      {notebooks.length > 0 && (
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notebooks.map((nb) => (
            <div key={nb._id} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2">{nb.title}</h3>
              <p className="text-gray-600 mb-2">{nb.description}</p>
              <p className="text-sm text-gray-500">Created: {new Date(nb.createdAt).toLocaleDateString()}</p>
              <p className="text-sm text-gray-500">Favourite: {nb.favourite ? "Yes" : "No"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LoginRegister;

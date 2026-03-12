import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/forgot-password`,
        { email }
      );

      setMessage(data.message);
      setEmail("");

    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">

        <h2 className="text-3xl font-bold text-center mb-2">
          Forgot Password
        </h2>

        <p className="text-gray-500 text-sm text-center mb-6">
          Enter your registered email to receive a reset link.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            required
            placeholder="Enter your email"
            className="w-full border border-gray-300 focus:border-black focus:ring-0 p-3 rounded-lg outline-none transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:opacity-90"
            }`}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

        </form>

        {/* Success Message */}
        {message && (
          <p className="text-green-600 mt-4 text-center text-sm">
            {message}
          </p>
        )}

        {/* Error Message */}
        {error && (
          <p className="text-red-600 mt-4 text-center text-sm">
            {error}
          </p>
        )}

        {/* Back to Login */}
        <p className="text-center text-sm mt-6">
          Remember your password?{" "}
          <Link
            to="/login"
            className="text-black font-semibold hover:underline"
          >
            Back to Login
          </Link>
        </p>

      </div>
    </div>
  );
}
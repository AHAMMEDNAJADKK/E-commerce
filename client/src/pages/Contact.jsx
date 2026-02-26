import { useState } from "react";
import axios from "axios";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      await axios.post("/api/contact", formData);

      setSuccess("Message sent successfully! 🎉");
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 md:px-16 py-14 max-w-6xl mx-auto">
      {/* HERO */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-caviro mb-4">
          Contact Wear Caviro
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          We’re here to help you with orders, products, and collaborations.
        </p>
      </div>

      {/* CONTENT */}
      <div className="grid md:grid-cols-2 gap-12">
        {/* LEFT INFO */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-caviro mb-3">
              Get in Touch
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Have a question about our sneakers, shipping, or payments?
              Our support team is ready to assist you.
            </p>
          </div>

          <div className="bg-gray-100 rounded-2xl p-6 space-y-4">
            <p className="text-gray-700">
              📞 <span className="font-semibold">Phone:</span> +91 9539691757
            </p>
            <p className="text-gray-700">
              📧 <span className="font-semibold">Email:</span> support@wearcaviro.com
            </p>
            <p className="text-gray-700">
              🚚 <span className="font-semibold">Shipping:</span> All over India
            </p>
          </div>

          <div className="bg-[#233D00] text-white rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-2">
              Business & Collaborations
            </h3>
            <p className="text-sm opacity-90">
              For brand partnerships, bulk orders, or influencer collaborations,
              contact us via email.
            </p>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="bg-white border rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-6 text-caviro">
            Send Us a Message
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-caviro"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-caviro"
            />

            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-caviro"
            />

            {/* SUCCESS MESSAGE */}
            {success && (
              <p className="text-green-600 text-sm font-medium">
                {success}
              </p>
            )}

            {/* ERROR MESSAGE */}
            {error && (
              <p className="text-red-600 text-sm font-medium">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-caviro text-white py-3 rounded-full font-semibold hover:opacity-90 transition disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>

      {/* FOOT NOTE */}
      <div className="text-center mt-20 text-gray-500 text-sm">
        We usually respond within 24 hours.
      </div>
    </div>
  );
}
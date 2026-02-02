export default function Contact() {
  return (
    <div className="w-full border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-caviro"
>
      <h1 className="text-3xl font-bold text-caviro mb-6">Contact Us</h1>

      <p className="mb-6 text-gray-600">
        Have questions or need help? Reach out to Wear Caviro Sneakers.
      </p>

      <form className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full border p-3 rounded"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full border p-3 rounded"
        />
        <textarea
          placeholder="Your Message"
          className="w-full border p-3 rounded h-32"
        />
        <button className="bg-caviro text-white px-6 py-2 rounded">
          Send Message
        </button>
      </form>

      <div className="mt-10 text-sm text-gray-600">
        📞 +91 9539691757 <br />
        📍 Shipping all over India
      </div>
    </div>
  );
}

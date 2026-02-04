export default function Contact() {
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

          <form className="space-y-5">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-caviro"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-caviro"
            />

            <textarea
              placeholder="Your Message"
              rows="5"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-caviro"
            />

            <button
              type="submit"
              className="w-full bg-caviro text-white py-3 rounded-full font-semibold hover:opacity-90 transition"
            >
              Send Message
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

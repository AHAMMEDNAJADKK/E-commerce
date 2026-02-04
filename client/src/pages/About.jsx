export default function About() {
  return (
    <div className="px-6 md:px-16 py-14 max-w-6xl mx-auto">
      
      {/* HERO */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-caviro mb-4">
          About Wear Caviro
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg">
          Where premium craftsmanship meets modern streetwear culture.
        </p>
      </div>

      {/* BRAND STORY */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-2xl font-bold text-caviro mb-4">
            Our Story
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Wear Caviro was founded with one simple goal — to make premium,
            stylish sneakers accessible across India without compromising on
            quality or comfort.
          </p>
          <p className="text-gray-700 leading-relaxed">
            From streetwear essentials to performance-inspired designs, our
            collections reflect confidence, durability, and individuality.
          </p>
        </div>

        <div className="bg-gray-100 rounded-2xl p-8">
          <h3 className="text-xl font-semibold mb-4">
            What We Stand For
          </h3>
          <ul className="space-y-3 text-gray-700">
            <li>✔ Premium 10A & budget-friendly 7A quality</li>
            <li>✔ Trusted sneaker brands & collections</li>
            <li>✔ Pan-India delivery</li>
            <li>✔ Secure & reliable payments</li>
          </ul>
        </div>
      </div>

      {/* QUALITY SECTION */}
      <div className="bg-[#233D00] text-white rounded-2xl p-12 mb-20">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Our Quality Promise
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-white/10 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-2">
              10A Quality Sneakers
            </h3>
            <p className="text-sm opacity-90">
              Premium craftsmanship, superior materials, and maximum comfort —
              designed for sneaker enthusiasts who want the best.
            </p>
          </div>

          <div className="bg-white/10 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-2">
              7A Quality Sneakers
            </h3>
            <p className="text-sm opacity-90">
              Stylish, durable, and budget-friendly sneakers crafted for
              everyday wear without compromising on looks.
            </p>
          </div>
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div className="text-center mb-20">
        <h2 className="text-3xl font-bold text-caviro mb-10">
          Why Choose Wear Caviro?
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[
            "Premium Sneaker Collections",
            "Modern & Responsive Design",
            "Secure Payments",
            "Fast Shipping Across India",
          ].map((item, i) => (
            <div
              key={i}
              className="border rounded-xl p-6 hover:shadow-lg transition"
            >
              <p className="font-semibold text-gray-700">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center bg-gray-100 rounded-2xl p-12">
        <h2 className="text-3xl font-bold mb-4">
          Step Into Style with Wear Caviro
        </h2>
        <p className="text-gray-600 mb-6">
          Explore premium sneakers crafted for every lifestyle.
        </p>
        <button className="bg-caviro text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition">
          Explore Collection
        </button>
      </div>
    </div>
  );
}

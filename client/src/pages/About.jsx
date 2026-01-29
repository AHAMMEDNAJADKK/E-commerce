export default function About() {
  return (
    <div className="px-6 md:px-16 py-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-caviro mb-6">About Wear Caviro</h1>

      <p className="text-gray-700 mb-4">
        Wear Caviro Sneakers is a modern Indian sneaker brand focused on
        delivering premium, stylish, and comfortable footwear across India.
      </p>

      <p className="text-gray-700 mb-4">
        Built with a passion for streetwear and performance, we bring together
        top sneaker brands like Nike, Adidas, Jordan, Vans, and more — all in
        one place.
      </p>

      <p className="text-gray-700 mb-4">
        This platform is developed as a full-stack MERN e-commerce application
        with secure payments, responsive design, and scalable architecture.
      </p>

      <div className="mt-8 bg-gray-100 p-6 rounded">
        <h2 className="text-xl font-semibold mb-2">Why Wear Caviro?</h2>
        <ul className="list-disc ml-6 text-gray-700">
          <li>Premium sneaker collections</li>
          <li>Pan-India shipping</li>
          <li>Secure Razorpay payments</li>
          <li>Modern, responsive UI</li>
        </ul>
      </div>
    </div>
  );
}

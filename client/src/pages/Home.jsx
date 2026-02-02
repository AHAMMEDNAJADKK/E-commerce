import SectionTitle from "../components/SectionTitle";
import ProductCard from "../components/ProductCard";
import { useProductFilter } from "../context/ProductFilterContext";

const newArrivals = [
  {
    id: 1,
    name: "Air Max Pro",
    brand: "Nike",
    price: 9999,
    quality: "10A",
    image:
      "https://images.unsplash.com/photo-1606813902914-3fbeed1f91c8",
  },
  {
    id: 2,
    name: "Ultra Boost",
    brand: "Adidas",
    price: 10999,
    quality: "10A",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  },
  {
    id: 3,
    name: "Classic Leather",
    brand: "Reebok",
    price: 8999,
    quality: "7A",
    image:
      "https://images.unsplash.com/photo-1528701800489-20be3c1ea8ba",
  },
];

const trending = [
  {
    id: 4,
    name: "Jordan High",
    brand: "Jordan",
    price: 12999,
    quality: "10A",
    image:
      "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f",
  },
  {
    id: 5,
    name: "Old Skool",
    brand: "Vans",
    price: 6999,
    quality: "7A",
    image:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a",
  },
  {
    id: 6,
    name: "Mexico 66",
    brand: "Onitsuka Tiger",
    price: 8499,
    quality: "7A",
    image:
      "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6",
  },
];

export default function Home() {
  const { qualityFilter, setQualityFilter, filterProducts } =
    useProductFilter();

  return (
    <div className="px-6 md:px-16 py-10">
      {/* 🔥 HERO SECTION */}
      <div className="bg-caviro text-white rounded-2xl p-10 mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Wear Caviro Sneakers
        </h1>
        <p className="text-lg mb-6 opacity-90">
          Premium 10A & budget-friendly 7A sneakers – shipped all over
          India 🇮🇳
        </p>
        <button className="bg-white text-caviro px-8 py-3 rounded-full font-semibold hover:scale-105 transition">
          Shop Now
        </button>
      </div>

      {/* 🔹 QUALITY FILTER */}
      <div className="flex justify-center gap-4 mb-14">
        {["ALL", "10A", "7A"].map((q) => (
          <button
            key={q}
            onClick={() => setQualityFilter(q)}
            className={`px-6 py-2 rounded-full border font-medium transition
              ${
                qualityFilter === q
                  ? "bg-caviro text-white"
                  : "border-caviro text-caviro hover:bg-caviro hover:text-white"
              }`}
          >
            {q === "ALL" ? "All Products" : `${q} Quality`}
          </button>
        ))}
      </div>

      {/* 🆕 NEW ARRIVALS */}
      <SectionTitle
        title="New Arrivals"
        subtitle="Fresh drops in 10A & 7A quality"
      />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mb-20">
        {filterProducts(newArrivals).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* 🔥 TRENDING */}
      <SectionTitle
        title="Trending Sneakers"
        subtitle="Most loved by sneakerheads"
      />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mb-20">
        {filterProducts(trending).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* ⭐ EXCLUSIVE */}
      <SectionTitle
        title="Exclusive Looks"
        subtitle="Limited collections you won’t find anywhere else"
      />
      <div className="bg-gray-100 rounded-xl p-12 text-center">
        <p className="text-lg mb-6">
          Hand-picked premium sneakers in both 10A and 7A quality —
          curated for every budget.
        </p>
        <button className="bg-caviro text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition">
          Explore Collection
        </button>
      </div>
    </div>
  );
}

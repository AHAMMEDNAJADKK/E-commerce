import SectionTitle from "../components/SectionTitle";
import ProductCard from "../components/ProductCard";
import { useProductFilter } from "../context/ProductFilterContext";
import { useProducts } from "../context/ProductContext";

export default function Home() {
  const { products } = useProducts();
  const { qualityFilter, setQualityFilter, filterProducts } =
    useProductFilter();

  const newArrivals = products.filter((p) => p.isNewArrival);
  const trending = products.filter((p) => p.isTrending);

  // 🔥 SCROLL FUNCTION
  const scrollToProducts = () => {
    const section = document.getElementById("all-products");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="px-6 md:px-16 py-10">
      {/* 🔥 HERO SECTION */}
      <div className="bg-caviro text-white rounded-2xl p-10 mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Wear Caviro Sneakers
        </h1>
        <p className="text-lg mb-6 opacity-90">
          Premium 10A & budget-friendly 7A sneakers – shipped all
          over India 🇮🇳
        </p>
        <button
          onClick={scrollToProducts}
          className="bg-white text-caviro px-8 py-3 rounded-full font-semibold hover:scale-105 transition"
        >
          Shop Now
        </button>
      </div>

      {/* 🔹 QUALITY FILTER */}
      <div className="flex justify-center gap-4 mb-14">
        {["ALL", "10A", "7A"].map((q) => (
          <button
            key={q}
            onClick={() => setQualityFilter(q)}
            className={`px-6 py-2 rounded-full border font-medium transition ${
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
      {newArrivals.length > 0 && (
        <>
          <SectionTitle
            title="New Arrivals"
            subtitle="Fresh drops in 10A & 7A quality"
          />
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mb-20">
            {filterProducts(newArrivals).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}

      {/* 🔥 TRENDING */}
      {trending.length > 0 && (
        <>
          <SectionTitle
            title="Trending Sneakers"
            subtitle="Most loved by sneakerheads"
          />
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mb-20">
            {filterProducts(trending).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}

      {/* ⭐ ALL PRODUCTS */}
      {products.length > 0 && (
        <div id="all-products">
          <SectionTitle
            title="All Products"
            subtitle="Explore our complete collection"
          />
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mb-20">
            {filterProducts(products).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}

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
        <button
          onClick={scrollToProducts}
          className="bg-caviro text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition"
        >
          Explore Collection
        </button>
      </div>
    </div>
  );
}

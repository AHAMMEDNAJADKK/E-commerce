import SectionTitle from "../components/SectionTitle";
import ProductCard from "../components/ProductCard";
import { useProductFilter } from "../context/ProductFilterContext";
import { useProducts } from "../context/ProductContext";

export default function Home() {
  const { products } = useProducts();

  const {
    brandFilter,
    setBrandFilter,
    qualityFilter,
    setQualityFilter,
    search,
    setSearch,
    filterProducts,
  } = useProductFilter();

  const newArrivals = products.filter((p) => p.isNewArrival);
  const trending = products.filter((p) => p.isTrending);

  const scrollToProducts = () => {
    const section = document.getElementById("all-products");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  // ✅ Normalize brands properly
  const uniqueBrands = [
    "all",
    ...new Set(
      products
        .map((p) => (p.brand || "").toLowerCase().trim())
        .filter(Boolean)
    ),
  ];

  return (
    <div className="px-6 md:px-16 py-10">

      {/* HERO */}
      <div className="bg-caviro text-white rounded-2xl p-10 mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Wear Caviro Sneakers
        </h1>
        <p className="text-lg mb-6 opacity-90">
          Premium 10A & 7A sneakers – shipped all over India 🇮🇳
        </p>
        <button
          onClick={scrollToProducts}
          className="bg-white text-caviro px-8 py-3 rounded-full font-semibold hover:scale-105 transition"
        >
          Shop Now
        </button>
      </div>

      {/* SEARCH */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search sneakers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border rounded-lg"
        />
      </div>

      {/* FILTER SECTION */}
      <div className="flex flex-col md:flex-row justify-center gap-4 mb-14">

        {/* QUALITY FILTER */}
        <div className="flex gap-3 flex-wrap justify-center">
          {["all", "10A", "7A"].map((q) => (
            <button
              key={q}
              onClick={() => setQualityFilter(q)}
              className={`px-5 py-2 rounded-full border transition ${
                qualityFilter === q
                  ? "bg-caviro text-white"
                  : "border-caviro text-caviro hover:bg-caviro hover:text-white"
              }`}
            >
              {q === "all" ? "All Quality" : q}
            </button>
          ))}
        </div>

        {/* BRAND FILTER */}
        <select
          value={brandFilter}
          onChange={(e) => setBrandFilter(e.target.value)}
          className="px-5 py-2 rounded-full border border-caviro text-caviro"
        >
          {uniqueBrands.map((brand) => (
            <option key={brand} value={brand}>
              {brand === "all"
                ? "All Brands"
                : brand.charAt(0).toUpperCase() + brand.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* NEW ARRIVALS */}
      {newArrivals.length > 0 && (
        <>
          <SectionTitle title="New Arrivals" subtitle="Fresh drops" />
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mb-20">
            {filterProducts(newArrivals).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </>
      )}

      {/* TRENDING */}
      {trending.length > 0 && (
        <>
          <SectionTitle title="Trending Sneakers" subtitle="Most loved" />
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mb-20">
            {filterProducts(trending).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </>
      )}

      {/* ALL PRODUCTS */}
      <div id="all-products">
        <SectionTitle title="All Products" subtitle="Explore collection" />
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mb-20">
          {filterProducts(products).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
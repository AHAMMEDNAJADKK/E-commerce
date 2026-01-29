import SectionTitle from "../components/SectionTitle";
import ProductCard from "../components/ProductCard";

const newArrivals = [
  {
    id: 1,
    name: "Air Max Pro",
    brand: "Nike",
    price: 9999,
    image: "https://images.unsplash.com/photo-1606813902914-3fbeed1f91c8",
  },
  {
    id: 2,
    name: "Ultra Boost",
    brand: "Adidas",
    price: 10999,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  },
  {
    id: 3,
    name: "Classic Leather",
    brand: "Reebok",
    price: 8999,
    image: "https://images.unsplash.com/photo-1528701800489-20be3c1ea8ba",
  },
];

const trending = [
  {
    id: 4,
    name: "Jordan High",
    brand: "Jordan",
    price: 12999,
    image: "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f",
  },
  {
    id: 5,
    name: "Old Skool",
    brand: "Vans",
    price: 6999,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a",
  },
  {
    id: 6,
    name: "Mexico 66",
    brand: "Onitsuka Tiger",
    price: 8499,
    image: "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6",
  },
];

export default function Home() {
  return (
    <div className="px-6 md:px-16 py-10">
      {/* Hero Section */}
      <div className="bg-caviro text-white rounded-2xl p-10 mb-16 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Step Into Style with Wear Caviro
        </h1>
        <p className="text-lg mb-6">
          Premium sneakers shipped all over India 🇮🇳
        </p>
        <button className="bg-white text-caviro px-6 py-2 rounded font-semibold">
          Shop Now
        </button>
      </div>

      {/* New Arrivals */}
      <SectionTitle
        title="New Arrivals"
        subtitle="Fresh drops, just landed"
      />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mb-20">
        {newArrivals.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Trending */}
      <SectionTitle
        title="Trending Sneakers"
        subtitle="Most loved by sneakerheads"
      />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mb-20">
        {trending.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Exclusive */}
      <SectionTitle
        title="Exclusive Looks"
        subtitle="Limited edition collections"
      />
      <div className="bg-gray-100 rounded-xl p-10 text-center">
        <p className="text-lg mb-4">
          Hand-picked premium sneakers only at Wear Caviro
        </p>
        <button className="bg-caviro text-white px-6 py-2 rounded">
          Explore Collection
        </button>
      </div>
    </div>
  );
}

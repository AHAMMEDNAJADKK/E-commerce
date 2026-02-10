import { useProducts } from "../context/ProductContext";

export default function AdminProducts() {
  const { products, deleteProduct } = useProducts();

  return (
    <>
      {products.map(p => (
        <div key={p.id}>
          <h3>{p.name}</h3>
          <button onClick={() => deleteProduct(p.id)}>Delete</button>
        </div>
      ))}
    </>
  );
}

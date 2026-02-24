import { createContext, useContext, useState } from "react";

const ProductFilterContext = createContext();

export function ProductFilterProvider({ children }) {
  const [brandFilter, setBrandFilter] = useState("all");
  const [qualityFilter, setQualityFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filterProducts = (products) => {
    return products.filter((p) => {
      const productBrand = (p.brand || "").toLowerCase().trim();
      const selectedBrand = brandFilter.toLowerCase().trim();

      const matchBrand =
        selectedBrand === "all" || productBrand === selectedBrand;

      const matchQuality =
        qualityFilter === "all" ||
        (p.quality || "").toLowerCase() === qualityFilter.toLowerCase();

      const matchSearch =
        (p.name || "")
          .toLowerCase()
          .includes(search.toLowerCase());

      return matchBrand && matchQuality && matchSearch;
    });
  };

  return (
    <ProductFilterContext.Provider
      value={{
        brandFilter,
        setBrandFilter,
        qualityFilter,
        setQualityFilter,
        search,
        setSearch,
        filterProducts,
      }}
    >
      {children}
    </ProductFilterContext.Provider>
  );
}

export const useProductFilter = () =>
  useContext(ProductFilterContext);
import { createContext, useContext, useState } from "react";

const ProductFilterContext = createContext();

export function ProductFilterProvider({ children }) {
  const [brandFilter, setBrandFilter] = useState("ALL");
  const [qualityFilter, setQualityFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  const filterProducts = (products) => {
    return products.filter((p) => {
      const matchBrand =
        brandFilter === "ALL" || p.brand === brandFilter;

      const matchQuality =
        qualityFilter === "ALL" || p.quality === qualityFilter;

      const matchSearch = p.name
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

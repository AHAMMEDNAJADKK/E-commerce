import { createContext, useContext, useState } from "react";

const ProductFilterContext = createContext();

export function ProductFilterProvider({ children }) {
  const [qualityFilter, setQualityFilter] = useState("ALL");
  const [brandFilter, setBrandFilter] = useState("ALL");

  const filterProducts = (products) => {
    return products.filter((product) => {
      const qualityMatch =
        qualityFilter === "ALL" || product.quality === qualityFilter;

      const brandMatch =
        brandFilter === "ALL" || product.brand === brandFilter;

      return qualityMatch && brandMatch;
    });
  };

  return (
    <ProductFilterContext.Provider
      value={{
        qualityFilter,
        setQualityFilter,
        brandFilter,
        setBrandFilter,
        filterProducts,
      }}
    >
      {children}
    </ProductFilterContext.Provider>
  );
}

export const useProductFilter = () => useContext(ProductFilterContext);

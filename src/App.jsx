import { useState, useEffect } from "react";
import "./App.css";
import Products from "./Products";
import Filters from "./Filters";

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    const data = await fetch("https://fakestoreapi.com/products");
    const res = await data.json();
    setProducts(res || []);
    setFilterProducts(res || []);
  };

  const fetchCategories = async () => {
    const data = await fetch("https://fakestoreapi.com/products/categories");
    const category = await data.json();
    setCategories(category || []);
  };

  useEffect(() => {
    checkProduct(searchText);
  }, [searchText]);

  useEffect(() => {
    setTimeout(() => {
      checkFilters();
    }, 100);
  }, [filters]);

  const checkFilters = () => {
    let updateProduct = [];
    let prod = [];
    if (Object.keys(filters).length) {
      if (filters["category"] && filters["rating"] && filters["pricing"]) {
        const price = filters["pricing"].split("-");
        updateProduct = products.filter(
          (item) =>
            item.rating.rate >= filters["rating"] &&
            String(filters["category"]).includes(String(item.category)) &&
            Number(price[0]) &&
            item.price <= Number(price[1])
        );
      } else {
        prod = Object.keys(filters).length == 1 ? products : filterProducts;
        if (filters["category"]) {
          updateProduct = prod.filter((item) =>
            filters["category"].includes(item.category)
          );
        }
        if (filters["rating"]) {
          updateProduct = prod.filter(
            (item) => item.rating.rate >= filters["rating"]
          );
        }
        if (filters["pricing"]) {
          const price = filters["pricing"].split("-");
          updateProduct = prod.filter(
            (item) =>
              item.price >= Number(price[0]) && item.price <= Number(price[1])
          );
        }
      }
      setFilterProducts(updateProduct);
    } else setFilterProducts(products);
  };

  const searchProduct = (text) => setSearchText(text);

  const checkProduct = () => {
    const prod = filterProducts.filter((item) =>
      String(item.title)
        .toLowerCase()
        .includes(String(searchText).toLowerCase())
    );
    if (searchText.trim() == "" && Object.keys(filters).length) checkFilters();
    else setFilterProducts(searchText.trim() != "" ? prod : products);
  };

  const clearFilter = () => {
    setFilters({});
    setFilterProducts(products);
    setSearchText("");
  };

  return (
    <div className="conatiner">
      <Filters
        categories={categories}
        setFilters={setFilters}
        filters={filters}
        clearFilter={clearFilter}
      />
      <Products
        products={filterProducts}
        searchProduct={searchProduct}
        searchText={searchText}
      />
    </div>
  );
}

export default App;

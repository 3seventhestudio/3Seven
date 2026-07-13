import { useEffect, useMemo, useState } from "react";

import "./Shop.css";

import Navbar from "../../components/layout/Navbar/Navbar";
import Footer from "../../components/layout/Footer/Footer";
import Newsletter from "../../components/home/Newsletter/Newsletter";

import Breadcrumb from "../../components/common/Breadcrumb/Breadcrumb";

import ProductCard from "../../components/product/ProductCard/ProductCard";
import ShopToolbar from "../../components/product/ShopToolbar/ShopToolbar";
import FilterSidebar from "../../components/filters/FilterSidebar/FilterSidebar";
import Pagination from "../../components/common/Pagination/Pagination";

import useProducts from "../../hooks/useProducts";

function Shop() {
  const breadcrumbItems = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: "Shop",
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedWash, setSelectedWash] = useState("");
  const [onlyNew, setOnlyNew] = useState(false);

  const [sortBy, setSortBy] = useState("featured");
  const [gridColumns, setGridColumns] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 12;
  const{ products, loading, error } = useProducts();
  console.log("Products:", products);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== "All") {
      result = result.filter(
        (product) => product.category?.name === selectedCategory
      );
    }

    if (onlyNew) {
      result = result.filter(
        (product) => product.new_arrival
      );
    }

    switch (sortBy) {
      case "price-low-high":
        result.sort((a, b) => a.price - b.price);
        break;

      case "price-high-low":
        result.sort((a, b) => b.price - a.price);
        break;

      case "rating":
        //result.sort((a, b) => b.rating - a.rating);
        break;

      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;

      default:
        break;
    }

    return result;
  }, [
    products,
    selectedCategory,
    onlyNew,
    sortBy,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedCategory,
    selectedSize,
    selectedWash,
    onlyNew,
    sortBy,
  ]);

  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );
  console.log("Displayed Products:", displayedProducts);
  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedSize("");
    setSelectedWash("");
    setOnlyNew(false);
    setCurrentPage(1);
  };

  if (loading) {
  return (
    <>
      <Navbar />
      <div className="container" style={{ padding: "80px 0", textAlign: "center" }}>
        Loading products...
      </div>
      <Footer />
    </>
  );
}

if (error) {
  return (
    <>
      <Navbar />
      <div className="container" style={{ padding: "80px 0", textAlign: "center" }}>
        {error}
      </div>
      <Footer />
    </>
  );
}

  return (
    <>
      <Navbar />

      <Breadcrumb items={breadcrumbItems} />

      <section className="shop-page">
        <div className="container">
          <div className="shop-header">
            <div>
              <h1>Premium Women's Denim</h1>

              <p>
                Discover timeless silhouettes crafted with premium fabrics,
                exceptional comfort, and effortless elegance for everyday wear.
              </p>
            </div>

            <div className="shop-result">
              Showing <strong>{filteredProducts.length}</strong> Products
            </div>
          </div>

          <div className="shop-layout">
            <aside className="shop-sidebar">
              <FilterSidebar
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
                selectedWash={selectedWash}
                setSelectedWash={setSelectedWash}
                onlyNew={onlyNew}
                setOnlyNew={setOnlyNew}
                clearFilters={clearFilters}
              />
            </aside>

            <main className="shop-products">
              <ShopToolbar
                totalProducts={filteredProducts.length}
                sortBy={sortBy}
                setSortBy={setSortBy}
                gridColumns={gridColumns}
                setGridColumns={setGridColumns}
              />

              <div
                className="products-grid"
                style={{
                  gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
                }}
              >
                {displayedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </main>
          </div>
        </div>
      </section>

      <Newsletter />

      <Footer />
    </>
  );
}

export default Shop;
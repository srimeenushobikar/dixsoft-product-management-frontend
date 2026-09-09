import { useEffect, useState } from "react";

import Sidebar from "./components/Sidebar";
import ProductForm from "./components/ProductForm";
import ProductTable from "./components/ProductTable";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from "./services/productService";

function App() {

  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [editingProduct, setEditingProduct] = useState(null);

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [activePage, setActivePage] = useState("products");

  const productsPerPage = 5;


  // LOAD PRODUCTS
  const loadProducts = async (searchValue = "") => {

    try {

      setLoading(true);
      setError("");

      const response = await getProducts(searchValue);

      if (response.success === 1) {
        setProducts(response.data);
      }

    } catch (err) {

      console.error(err);

      setError(
          "Unable to load products. Make sure the backend is running."
      );

    } finally {

      setLoading(false);

    }
  };


  // LOAD PRODUCTS WHEN PAGE OPENS
  useEffect(() => {

    loadProducts();

  }, []);


  // SEARCH
  const handleSearch = async (event) => {

    const value = event.target.value;

    setSearch(value);
    setCurrentPage(1);

    await loadProducts(value);

  };


  // OPEN ADD FORM
  const handleAddProduct = () => {

    setEditingProduct(null);
    setShowForm(true);
    setMessage("");
    setError("");

  };


  // OPEN EDIT FORM
  const handleEditProduct = (product) => {

    setEditingProduct(product);
    setShowForm(true);
    setMessage("");
    setError("");

  };


  // ADD OR UPDATE PRODUCT
  const handleSubmit = async (productData) => {

    try {

      setError("");
      setMessage("");

      if (editingProduct) {

        // UPDATE
        const response = await updateProduct(
            editingProduct.prodId,
            productData
        );

        if (response.success === 1) {

          setProducts((previousProducts) =>
              previousProducts.map((product) =>
                  product.prodId === editingProduct.prodId
                      ? {
                        ...product,
                        ...productData
                      }
                      : product
              )
          );

          setMessage(
              "Product updated successfully!"
          );
        }

      } else {

        // CREATE
        const response = await createProduct(productData);

        if (response.success === 1) {

          setMessage(
              "Product created successfully!"
          );

          // Reload products to get the new ID
          await loadProducts(search);

        }

      }

      setShowForm(false);
      setEditingProduct(null);

    } catch (err) {

      console.error(err);

      setError(
          "Unable to save product. Please try again."
      );

    }

  };


  // DELETE PRODUCT
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    try {

      setError("");
      setMessage("");

      const response = await deleteProduct(id);

      if (response.success === 1) {

        // Remove row from the current table
        // without refreshing the whole page
        setProducts((previousProducts) =>
            previousProducts.filter(
                (product) => product.prodId !== id
            )
        );

        setMessage(
            "Product deleted successfully!"
        );

      }

    } catch (err) {

      console.error(err);

      setError(
          "Unable to delete product. Please try again."
      );

    }

  };


  // PAGINATION
  const totalPages = Math.ceil(
      products.length / productsPerPage
  );

  const startIndex =
      (currentPage - 1) * productsPerPage;

  const currentProducts =
      products.slice(
          startIndex,
          startIndex + productsPerPage
      );


  return (

      <div className="app">

        {/* SIDEBAR */}

        <Sidebar
            activePage={activePage}
            onPageChange={setActivePage}
        />


        {/* MAIN CONTENT */}

        <main className="main-content">

          {/* TOP BAR */}

          <header className="topbar">

            <h1>
              Product Management
            </h1>

          </header>


          {/* CONTENT */}

          {activePage === "about" ? (
              <section className="about-page">
                <div className="about-card">
                  <h2>About Product Management</h2>

                  <p>
                    The Product Management System is a web-based application
                    designed to help administrators efficiently manage
                    product information.
                  </p>

                  <p>
                    The application allows users to add new products, view
                    and search existing products, update product details,
                    and delete products when they are no longer required.
                  </p>

                  <h3>Key Features</h3>

                  <ul>
                    <li>Add new products</li>
                    <li>View and search products</li>
                    <li>Edit and update product information</li>
                    <li>Delete products</li>
                    <li>Manage product category and quantity</li>
                    <li>Input validation for product details</li>
                  </ul>

                  <h3>Technology Used</h3>

                  <ul>
                    <li>ReactJS – Frontend</li>
                    <li>Spring Boot – Backend REST API</li>
                    <li>Java – Backend Programming Language</li>
                    <li>MySQL – Database</li>
                    <li>Axios – Frontend API Communication</li>
                  </ul>

                  <p>
                    This system provides a simple and user-friendly interface
                    for managing product data while maintaining communication
                    between the React frontend, Spring Boot backend, and
                    MySQL database.
                  </p>
                </div>
              </section>
          ) : (

          <section className="content">

            <div className="page-title">

              <div>
                <h2>
                  Products
                </h2>

                <p>
                  Manage your products
                </p>
              </div>

            </div>


            {/* TOOLBAR */}

            <div className="toolbar">

              <input
                  type="text"
                  className="search-input"
                  placeholder="Search product..."
                  value={search}
                  onChange={handleSearch}
              />

              <button
                  className="add-button"
                  onClick={handleAddProduct}
              >
                + ADD PRODUCT
              </button>

            </div>


            {/* SUCCESS MESSAGE */}

            {message && (

                <div className="success-message">
                  {message}
                </div>

            )}


            {/* ERROR MESSAGE */}

            {error && (

                <div className="error-message">
                  {error}
                </div>

            )}


            {/* LOADING */}

            {loading ? (

                <div className="loading">
                  Loading products...
                </div>

            ) : (

                <ProductTable
                    products={currentProducts}
                    onEdit={handleEditProduct}
                    onDelete={handleDelete}
                />

            )}


            {/* PAGINATION */}

            {!loading && totalPages > 1 && (

                <div className="pagination">

                  <button
                      disabled={currentPage === 1}
                      onClick={() =>
                          setCurrentPage(
                              currentPage - 1
                          )
                      }
                  >
                    Previous
                  </button>

                  <span>
                                Page {currentPage} of {totalPages}
                            </span>

                  <button
                      disabled={
                          currentPage === totalPages
                      }
                      onClick={() =>
                          setCurrentPage(
                              currentPage + 1
                          )
                      }
                  >
                    Next
                  </button>

                </div>

            )}

          </section>
          )}


          {/* ADD / EDIT MODAL */}

          {showForm && (

              <ProductForm
                  product={editingProduct}
                  onSubmit={handleSubmit}
                  onCancel={() => {
                    setShowForm(false);
                    setEditingProduct(null);
                  }}
              />

          )}

        </main>

      </div>

  );
}

export default App;
function ProductTable({ products, onEdit, onDelete }) {
    return (
        <div className="table-card">
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Product Name</th>
                    <th>Unit Cost</th>
                    <th>Category</th>
                    <th>Quantity</th>
                    <th>Actions</th>
                </tr>
                </thead>

                <tbody>
                {products.length === 0 ? (
                    <tr>
                        <td colSpan="6" className="no-data">
                            No products found
                        </td>
                    </tr>
                ) : (
                    products.map((product) => (
                        <tr key={product.prodId}>
                            <td>{product.prodId}</td>

                            <td>{product.prodName}</td>

                            <td>
                                ₹ {Number(product.unitCost).toFixed(2)}
                            </td>

                            <td>{product.category}</td>

                            <td>{product.quantity}</td>

                            <td>
                                <div className="action-buttons">
                                    <button
                                        className="edit-button"
                                        onClick={() =>
                                            onEdit(product)
                                        }
                                        title="Edit Product"
                                    >
                                        ✏️
                                    </button>

                                    <button
                                        className="delete-button"
                                        onClick={() =>
                                            onDelete(product.prodId)
                                        }
                                        title="Delete Product"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
}

export default ProductTable;
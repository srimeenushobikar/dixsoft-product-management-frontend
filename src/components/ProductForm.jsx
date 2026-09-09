import { useEffect, useState } from "react";

function ProductForm({ product, onSubmit, onCancel }) {
    const [prodName, setProdName] = useState("");
    const [unitCost, setUnitCost] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (product) {
            setProdName(product.prodName);
            setUnitCost(product.unitCost);
            setCategory(product.category);
            setQuantity(product.quantity);
        } else {
            setProdName("");
            setUnitCost("");
            setCategory("");
            setQuantity("");
        }

        setErrors({});
    }, [product]);

    const validate = () => {
        const newErrors = {};

        if (!prodName.trim()) {
            newErrors.prodName = "Product name is required";
        } else if (prodName.trim().length < 2) {
            newErrors.prodName =
                "Product name must contain at least 2 characters";
        }

        if (unitCost === "") {
            newErrors.unitCost = "Unit cost is required";
        } else if (Number(unitCost) <= 0) {
            newErrors.unitCost =
                "Unit cost must be greater than 0";
        }

        if (!category.trim()) {
            newErrors.category = "Category is required";
        }

        if (quantity === "") {
            newErrors.quantity = "Quantity is required";
        } else if (Number(quantity) < 0) {
            newErrors.quantity =
                "Quantity cannot be negative";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validate()) {
            return;
        }

        onSubmit({
            prodName: prodName.trim(),
            unitCost: Number(unitCost),
            category: category.trim(),
            quantity: Number(quantity)
        });
    };

    return (
        <div className="modal-overlay">
            <div className="modal">

                <div className="modal-header">
                    <h2>
                        {product ? "Edit Product" : "Add Product"}
                    </h2>

                    <button
                        type="button"
                        className="close-button"
                        onClick={onCancel}
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit}>

                    {/* Product Name */}
                    <div className="form-group">
                        <label>Product Name</label>

                        <input9
                            type="text"
                            value={prodName}
                            onChange={(e) =>
                                setProdName(e.target.value)
                            }
                            placeholder="Enter product name"
                        />

                        {errors.prodName && (
                            <p className="error">
                                {errors.prodName}
                            </p>
                        )}
                    </div>

                    {/* Unit Cost */}
                    <div className="form-group">
                        <label>Unit Cost</label>

                        <input
                            type="number"
                            value={unitCost}
                            onChange={(e) =>
                                setUnitCost(e.target.value)
                            }
                            placeholder="Enter unit cost"
                            min="0"
                            step="0.01"
                        />

                        {errors.unitCost && (
                            <p className="error">
                                {errors.unitCost}
                            </p>
                        )}
                    </div>

                    {/* Category */}
                    <div className="form-group">
                        <label>Category</label>

                        <input
                            type="text"
                            value={category}
                            onChange={(e) =>
                                setCategory(e.target.value)
                            }
                            placeholder="Enter category"
                        />

                        {errors.category && (
                            <p className="error">
                                {errors.category}
                            </p>
                        )}
                    </div>

                    {/* Quantity */}
                    <div className="form-group">
                        <label>Quantity</label>

                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) =>
                                setQuantity(e.target.value)
                            }
                            placeholder="Enter quantity"
                            min="0"
                        />

                        {errors.quantity && (
                            <p className="error">
                                {errors.quantity}
                            </p>
                        )}
                    </div>

                    <div className="form-buttons">

                        <button
                            type="button"
                            className="cancel-button"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="submit-button"
                        >
                            {product
                                ? "Update Pro duct"
                                : "Add Product"}
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
}

export default ProductForm;
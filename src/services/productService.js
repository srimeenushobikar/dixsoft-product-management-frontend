import axios from "axios";

const API_URL = "http://localhost:8080/product";

// GET PRODUCTS / SEARCH PRODUCTS
export const getProducts = async (search = "") => {

    const response = await axios.get(`${API_URL}/get`, {
        params: {
            prod_name: search
        }
    });

    return response.data;
};


// CREATE PRODUCT
export const createProduct = async (product) => {

    const response = await axios.post(
        `${API_URL}/create`,
        product
    );

    return response.data;
};


// UPDATE PRODUCT
export const updateProduct = async (id, product) => {

    const response = await axios.put(
        `${API_URL}/update/${id}`,
        product
    );

    return response.data;
};


// DELETE PRODUCT
export const deleteProduct = async (id) => {

    const response = await axios.delete(
        `${API_URL}/delete`,
        {
            data: {
                prod_id: id
            }
        }
    );

    return response.data;
};
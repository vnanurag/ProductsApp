const requestProducts = "REQUESTED_ALL_PRODUCTS";
const requestProductsSuccess = "REQUEST_ALL_PRODUCTS_SUCCESS";
const requestProductsFailure = "REQUEST_ALL_PRODUCTS_FAILED";

const requestProductById = "REQUESTED_PRODUCT_BY_ID";
const requestProductByIdSuccess = "REQUEST_PRODUCT_BY_ID_SUCCESS";
const requestProductByIdFailure = "REQUEST_PRODUCT_BY_ID_FAILED";

const requestAddProduct = "REQUESTED_ADD_PRODUCT";
const requestAddProductSuccess = "REQUEST_ADD_PRODUCT_SUCCESS";
const requestAddProductFailure = "REQUEST_ADD_PRODUCT_FAILED";

const requestUpdateProduct = "REQUESTED_UPDATE_PRODUCT";
const requestUpdateProductSuccess = "REQUEST_UPDATE_PRODUCT_SUCCESS";
const requestUpdateProductFailure = "REQUEST_UPDATE_PRODUCT_FAILED";

const requestDeleteProduct = "REQUESTED_DELETE_PRODUCT";
const requestDeleteProductSuccess = "REQUEST_DELETE_PRODUCT_SUCCESS";
const requestDeleteProductFailure = "REQUEST_DELETE_PRODUCT_FAILED";

const nameInputChanged = "NAME_INPUT_CHANGED";
const priceInputChanged = "PRICE_INPUT_CHANGED";
const serialNumberInputChanged = "SERIAL_NUMBER_INPUT_CHANGED";

const priceSort = "SORTED_BY_PRICE";

const initialState = {
    products: [],
    product: {
        name: '',
        price: '',
        serialNumber: ''
    },
    isLoading: false
};

export const actionCreators = {
    getAllProducts : () => async (dispatch, getState) => {
        dispatch({ type: requestProducts });
        try {
            const url = `api/Products`;
            const config = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const response = await fetch(url, config);
            const products = await response.json();

            dispatch({ type: requestProductsSuccess, products });
        } catch (e) {
            dispatch({ type: requestProductsFailure, e });
        }  
    },

    getProductById: (id) => async (dispatch, getState) => {
        dispatch({ type: requestProductById });
        try {
            const url = `api/Products/${id}`;
            const config = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const response = await fetch(url, config);
            const product = await response.json();

            dispatch({ type: requestProductByIdSuccess, product });
        } catch (e) {
            dispatch({ type: requestProductByIdFailure, e });
        }  
    },

    addProduct: () => async (dispatch, getState) => {
        dispatch({ type: requestAddProduct }); 

        try {
            let state = getState();
            const data = state.products.product;

            const url = `api/Products/add`;
            const config = {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const response = await fetch(url, config);
            const products = await response.json();

            dispatch({ type: requestAddProductSuccess, products });
        } catch (e) {
            dispatch({ type: requestAddProductFailure, e });
        }  
    },

    updateProduct: (id, data) => async (dispatch, getState) => {
        dispatch({ type: requestUpdateProduct });
        try {
            const url = `api/Products/${id}`;
            const config = {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const response = await fetch(url, config);
            const product = await response.json();

            dispatch({ type: requestUpdateProductSuccess, product });
        } catch (e) {
            dispatch({ type: requestUpdateProductFailure, e });
        }  
    },

    deleteProduct: (id) => async (dispatch, getState) => {
        dispatch({ type: requestDeleteProduct });
        try {
            const url = `api/Products/${id}`;
            const config = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const response = await fetch(url, config);
            const products = await response.json();

            dispatch({ type: requestDeleteProductSuccess, products });
        } catch (e) {
            dispatch({ type: requestDeleteProductFailure, e });
        }  
    },

    handleInputChange: (input) => async (dispatch, getState) => {
        let inputType = input.target.id;
        let value = input.target.value;

        if (inputType === 'name') {
            dispatch({ type: nameInputChanged, value })
        }
        else if (inputType === 'price') {
            dispatch({ type: priceInputChanged, value })
        }
        else if (inputType === 'serialNumber') {
            dispatch({ type: serialNumberInputChanged, value })
        }
    },

    sortColumn: () => async (dispatch, getState) => {
        const state = getState();
        const products = state.products.products;
        dispatch({ type: priceSort, products })
    }
};

export const reducer = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case requestProducts: {
            return {
                ...state,
                isLoading: true
            };
        }
        case requestProductsSuccess: {
            return {
                ...state,
                products: action.products,
                isLoading: false
            }
        }
        case requestProductsFailure: {
            return {
                ...state,
                error: action.e,
                isLoading: false
            }
        }
        case requestProductById: {
            return {
                ...state,
                isLoading: true
            };
        }
        case requestProductByIdSuccess: {
            return {
                ...state,
                products: action.products,
                isLoading: false
            }
        }
        case requestProductByIdFailure: {
            return {
                ...state,
                error: action.e,
                isLoading: false
            }
        }
        case requestAddProduct: {
            return {
                ...state,
                isLoading: true
            };
        }
        case requestAddProductSuccess: {
            return {
                ...state,
                products: action.products,
                product: [],
                isLoading: false
            }
        }
        case requestAddProductFailure: {
            return {
                ...state,
                error: action.e,
                isLoading: false
            }
        }
        case requestUpdateProduct: {
            return {
                ...state,
                isLoading: true
            };
        }
        case requestUpdateProductSuccess: {
            return {
                ...state,
                products: action.products,
                isLoading: false
            }
        }
        case requestUpdateProductFailure: {
            return {
                ...state,
                error: action.e,
                isLoading: false
            }
        }
        case requestDeleteProduct: {
            return {
                ...state,
                isLoading: true
            }
        }
        case requestDeleteProductSuccess: {
            return {
                ...state,
                products: action.products,
                isLoading: false
            }
        }
        case requestDeleteProductFailure: {
            return {
                ...state,
                error: action.e,
                isLoading: false
            }
        }
        case nameInputChanged: {
            return {
                ...state,
                product: {
                    ...state.product,
                    name: action.value
                }
            }
        }
        case priceInputChanged: {
            return {
                ...state,
                product: {
                    ...state.product,
                    price: action.value
                }
            }
        }
        case serialNumberInputChanged: {
            return {
                ...state,
                product: {
                    ...state.product,
                    serialNumber: action.value
                }
            }
        }
        case priceSort: {
            return {
                ...state,
                products: action.products
            }
        }
        default: {
            return state;
        }
    }   
}

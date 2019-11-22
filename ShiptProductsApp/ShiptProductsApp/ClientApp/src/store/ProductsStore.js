const requestProducts = "REQUESTED_ALL_PRODUCTS";
const getAllProductsSuccess = "GET_ALL_PRODUCTS_SUCCESS";
const getAllProductsFailure = "GET_ALL_PRODUCTS_FAILED";

const requestProductById = "REQUESTED_PRODUCT_BY_ID";
const getProductByIdSuccess = "GET_PRODUCT_BY_ID_SUCCESS";
const getProductByIdFailure = "GET_PRODUCT_BY_ID_FAILED";

const requestAddProduct = "REQUESTED_ADD_PRODUCT";
const addProductSuccess = "ADD_PRODUCT_SUCCESS";
const addProductFailure = "ADD_PRODUCT_FAILED";

const requestUpdateProduct = "REQUESTED_UPDATE_PRODUCT";
const updateProductSuccess = "UPDATE_PRODUCT_SUCCESS";
const updateProductFailure = "UPDATE_PRODUCT_FAILED";

const requestDeleteProduct = "REQUESTED_DELETE_PRODUCT";
const deleteProductSuccess = "DELETE_PRODUCT_SUCCESS";
const deleteProductFailure = "DELETE_PRODUCT_FAILED";

const nameInputChanged = "NAME_INPUT_CHANGED";
const priceInputChanged = "PRICE_INPUT_CHANGED";
const serialNumberInputChanged = "SERIAL_NUMBER_INPUT_CHANGED";

const initialState = {
    products: [],
    product: {
        name: '',
        price: '',
        serialNumber: ''
    },
    isLoading: false,
    error: ''
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

            dispatch({ type: getAllProductsSuccess, products });
        } catch (e) {
            dispatch({ type: getAllProductsFailure, e });
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

            dispatch({ type: getProductByIdSuccess, product });
        } catch (e) {
            dispatch({ type: getProductByIdFailure, e });
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

            if (response.ok) {
                dispatch({ type: addProductSuccess, products });
            }
            else {
                const error = 'Error adding product';
                dispatch({ type: addProductFailure, error });
            }
        } catch (e) {
            dispatch({ type: addProductFailure, e });
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

            dispatch({ type: updateProductSuccess, product });
        } catch (e) {
            dispatch({ type: updateProductFailure, e });
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
            await fetch(url, config);

            dispatch({ type: deleteProductSuccess, id });
        } catch (e) {
            dispatch({ type: deleteProductFailure, e });
        }  
    },

    handleInputChange: (input) => async (dispatch, getState) => {
        let inputType = input.target.id;
        let value = input.target.value;

        switch (inputType) {
            case 'name': {
                dispatch({ type: nameInputChanged, value });
                break;
            }
            case 'price': {
                dispatch({ type: priceInputChanged, value });
                break;
            }
            case 'serialNumber': {
                dispatch({ type: serialNumberInputChanged, value });
                break;
            }
            default:
        }
    },
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
        case getAllProductsSuccess: {
            return {
                ...state,
                products: action.products,
                isLoading: false
            }
        }
        case getAllProductsFailure: {
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
        case getProductByIdSuccess: {
            return {
                ...state,
                products: action.products,
                isLoading: false
            }
        }
        case getProductByIdFailure: {
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
        case addProductSuccess: {
            return {
                ...state,
                products: action.products,
                product: [],
                isLoading: false
            }
        }
        case addProductFailure: {
            return {
                ...state,
                error: action.error,
                isLoading: false
            }
        }
        case requestUpdateProduct: {
            return {
                ...state,
                isLoading: true
            };
        }
        case updateProductSuccess: {
            return {
                ...state,
                products: action.products,
                isLoading: false
            }
        }
        case updateProductFailure: {
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
        case deleteProductSuccess: {
            return {
                ...state,
                products: state.products.filter((prod) => prod.productId !== action.id),
                isLoading: false
            }
        }
        case deleteProductFailure: {
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
        default: {
            return state;
        }
    }   
}

const requestProducts = "REQUESTED_ALL_PRODUCTS";
const receiveProducts = "RECEIVED_ALL_PRODUCTS";

const initialState = {
    products: [],
    isLoading: false
};

export const actionCreators = {
    getAllProducts : () => async (dispatch, getState) => {
        dispatch({ type: requestProducts });

        const url = `api/Products`;
        const response = await fetch(url);
        const products = await response.json();

        dispatch({ type: receiveProducts, products });
    }
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === requestProducts) {
        return {
            ...state,
            isLoading: true
        };
    }

    if (action.type === receiveProducts) {
        return {
            ...state,
            products: action.products,
            isLoading: false
        }
    }

    return state;
}
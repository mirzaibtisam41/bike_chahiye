import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    cart: [],
    brands: [],
    wishList: [],
    route: null,
    spareParts: [],
    blogs: [],
    rating: 0,
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setAllBrands: (state, action) => {
            state.brands = action.payload;
        },
        setRating: (state, action) => {
            state.rating = action.payload;
        },
        setAllProducts: (state, action) => {
            state.products = action.payload;
        },
        setCartProducts: (state, action) => {
            state.cart.push(action.payload);
        },
        setWishListProducts: (state, action) => {
            state.wishList.push(action.payload);
        },
        setSparePartsProducts: (state, action) => {
            state.spareParts = action.payload;
        },
        setBlogsData: (state, action) => {
            state.blogs = action.payload;
        },
        removeCartProducts: (state, action) => {
            console.log(action)
            state.cart = state.cart.filter(item => item.product._id !== action.payload._id);
        },
        setRoute: (state, action) => {
            state.route = action.payload;
        },
        removeWishListProducts: (state, action) => {
            state.wishList = state.wishList.filter(item => item._id !== action.payload._id);
        },
        updateCartProduct: (state, action) => {
            const { id, op } = action.payload;
            state.cart.forEach(item => {
                if (item.product._id === id) {
                    if (op === '+') {
                        item.count += 1;
                    }
                    else if (op === "-" && item.count >= 2) {
                        item.count -= 1;
                    }
                }
            });
        }
    },
});

export const { setRating, setBlogsData, setAllProducts, setCartProducts, removeCartProducts, updateCartProduct, setAllBrands, setRoute, setWishListProducts, removeWishListProducts, setSparePartsProducts } = productSlice.actions;

export default productSlice.reducer;
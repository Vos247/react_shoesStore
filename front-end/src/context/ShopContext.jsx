import { createContext, useState, useEffect } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const delivery_Fee = 10000;
    const currency = 'VND: ';
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [discount, setDiscount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        getProductsData();
        if (token) getUserCart(token);
    }, [token]);

    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error("Vui lòng chọn size");
            return;
        }
        let cartData = { ...cartItems };
        cartData[itemId] = cartData[itemId] || {};
        cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(`${backendUrl}/api/cart/add`, { itemId, size }, { headers: { token } });
            } catch (error) {
                toast.error(error.message);
            }
        }
    };
    const getCartCount = () => {
        return Object.values(cartItems).reduce((total, sizes) => {
            return total + Object.values(sizes).reduce((sum, qty) => sum + qty, 0);
        }, 0);
    };
    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = { ...cartItems };
        if (cartData[itemId]) {
            cartData[itemId][size] = quantity;
        }
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(`${backendUrl}/api/cart/update`, { itemId, size, quantity }, { headers: { token } });
            } catch (error) {
                toast.error(error.message);
            }
        }
    };

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            const itemInfo = products.find(product => product._id === itemId);
            if (itemInfo) {
                for (const size in cartItems[itemId]) {
                    totalAmount += itemInfo.price * cartItems[itemId][size];
                }
            }
        }
        const finalAmount = Math.max(totalAmount - discount, 0);
        console.log("Tổng tiền trước giảm giá:", totalAmount);
        console.log("Discount áp dụng:", discount);
        console.log("Tổng tiền sau giảm giá:", finalAmount);
        return finalAmount;
    };    
    const checkDiscountCode = (code) => {
        const validCode = import.meta.env.VITE_DISCOUNT_CODE;
        const discountValue = parseInt(import.meta.env.VITE_DISCOUNT_AMOUNT) || 0;
    
        if (code === validCode) {
            console.log("Applying Discount:", discountValue);
            setDiscount(discountValue);
        } else {
            console.log("Invalid Code!");
            setDiscount(0);
        }
    };    
    const getProductsData = async () => {
        try {
            const response = await axios.post(`${backendUrl}/api/product/list`);
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };
    const getUserCart = async (token) => {
        try {
            const response = await axios.post(`${backendUrl}/api/cart/get`, {}, { headers: { token } });
            if (response.data.success) {
                setCartItems(response.data.cartData);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const value = {
        products,
        currency,
        delivery_Fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        setCartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        discount,
        checkDiscountCode,
        navigate,
        backendUrl,
        setToken,
        token
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;

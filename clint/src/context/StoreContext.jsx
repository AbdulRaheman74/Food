import { createContext, useEffect, useState } from "react";
// import {food_list} from '../assets/assets'
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvoider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = process.env.REACT_APP_API_URL;
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    if (token) {
      await axios.post(
        url + "api/cart/add",
        {
          itemId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // 👈 this fixes the mismatch
          },
        }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(
        url + "api/cart/remove",
        { itemId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }
  };



  const getTotalCartAmount = () => {
  let total = 0;
  for (const item in cartItems) {
    if (cartItems[item] > 0) {
      let itemInfo = food_list.find((product) => product._id === item);
      if (itemInfo) {
        total += itemInfo.price * cartItems[item];
      }
    }
  }
  return total;
};

  const fetchFoodData = async () => {
    try {
      const response = await axios.get(url + "api/food/all");
      setFoodList(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

const loadCartData = async (token) => {
  try {
    const response = await axios.post(url + "api/cart/get", {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setCartItems(response.data.cartData); // 👈 Assuming this sets items in cart
  } catch (error) {
    console.error("Failed to load cart data:", error.response?.data || error.message);
  }
};

useEffect(() => {
  async function loadData() {
    await fetchFoodData();

    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      await loadCartData(storedToken); // 👈 This will fetch cart items
    }
  }

  loadData();
}, []);


  useEffect(() => {
    async function loadData() {
      await fetchFoodData();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"))
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvoider;

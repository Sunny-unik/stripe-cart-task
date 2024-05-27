import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import errorOrganizer from "./helpers/errorOrganizer";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const refreshProducts = async () => {
    axios("http://localhost:4000/product")
      .then((res) => setProducts(res.data.data))
      .catch((error) => {
        alert("Server error in fetch products, try again later");
        console.error("Error fetching products:", error);
      });
  };

  useEffect(() => {
    refreshProducts();
  }, []);
  useEffect(() => {
    checkLoggedIn();
  }, [products]);

  const checkLoggedIn = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/user/auth", {
        withCredentials: true,
      });
      const userData = data.data;
      setUser(userData);
      const cartIds = userData.cartItems;
      const items = products.filter((item) => cartIds.includes(item._id));
      setCartItems(items);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:4000/user/login",
        { email, password },
        { withCredentials: true }
      );
      setUser(response.data.data);
      const cartIds = response.data.data.cartItems;
      setCartItems(products.filter((item) => cartIds.includes(item._id)));
      navigate("/");
    } catch (error) {
      errorOrganizer(error);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:4000/user/",
        userData
      );
      if (!data.success) return new Error("Internal server error");
      alert(data.message);
      navigate("/login");
    } catch (error) {
      errorOrganizer(error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await axios.post(
        "http://localhost:4000/user/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
    } catch (error) {
      errorOrganizer(error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product) => {
    try {
      if (!user) return alert("You need to login first");
      setLoading(true);
      const { data } = await axios.put(
        "http://localhost:4000/user/addToCart",
        { productId: product._id },
        { withCredentials: true }
      );
      setUser({ ...data.data });
      data.data?.cartItems &&
        setCartItems(
          products.filter((item) => data.data.cartItems.includes(item._id))
        );
      alert(data.message);
    } catch (error) {
      alert("Internal Server Error");
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      setLoading(true);
      const { data } = await axios.put(
        "http://localhost:4000/user/removeFromCart",
        { productId },
        { withCredentials: true }
      );
      setUser({ ...data.data });
      setCartItems(cartItems.filter((item) => productId !== item._id));
      alert(data.message);
    } catch (error) {
      alert("Internal Server Error");
    } finally {
      setLoading(false);
    }
  };

  const emptyCart = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put(
        "http://localhost:4000/user/emptyCart",
        {},
        { withCredentials: true }
      );
      setUser({ ...data.data });
      setCartItems([]);
      alert(data.message);
    } catch (error) {
      alert("Internal Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        cartItems,
        products,
        addToCart,
        removeFromCart,
        refreshProducts,
        emptyCart,
        user,
        loading,
        login,
        signup,
        checkLoggedIn,
        logout,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;

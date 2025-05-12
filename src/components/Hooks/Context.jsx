/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

// Create Context
const CategoryContext = createContext();

// Create Provider Component
export const CategoryProvider = ({ children }) => {
  const [currentCategory, setCurrentCategory] = useState(null);

  return (
    <CategoryContext.Provider value={{ currentCategory, setCurrentCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Load cart from local storage or set an empty array
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  // Update local storage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);


  const addToCart = (product) => {
    setCart((prevCart) => {
      return prevCart.map((item) =>
        item.id === product.id
          ? {
            ...item,
            quantity: item.quantity + 1,
            totalPrice: (item.quantity + 1) * item.price // Update total price
          }
          : item
      ).concat(prevCart.some(item => item.id === product.id) ? [] : [{
        ...product,
        quantity: 1,
        totalPrice: product.price // Initial price when added
      }]);
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) =>
          item.id === productId
            ? {
              ...item,
              quantity: item.quantity - 1,
              totalPrice: (item.quantity - 1) * item.price // Reduce total price
            }
            : item
        )
        .filter((item) => item.quantity > 0); // Remove if quantity reaches 0
    });
  };


  // Function to clear cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom Hooks
export const useCart = () => {
  return useContext(CartContext);
};

export const useCategory = () => {
  return useContext(CategoryContext);
};

// Create Context
const SidebarContext = createContext();

// Provider Component
export const SidebarProvider = ({ children }) => {
  const [selectedRoute, setSelectedRoute] = useState("/index"); // Default route

  return (
    <SidebarContext.Provider value={{ selectedRoute, setSelectedRoute }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Custom Hook to use SidebarContext
export const useSidebar = () => {
  return useContext(SidebarContext);
};







// src/context/AuthContext.js
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../Constant/Firebase";

// Create the context
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state for auth

  // Login function
  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // Logout function
  const logout = async () => {
    await signOut(auth);
  };

  // Listen for auth state changes (for persistent login)
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);// Stop loading once the user state is set
    });

    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// src/App.js
import { Route, Routes } from "react-router-dom";
import { AdminOrders, Auth, CartPage, Checkout, Dashboard, NotFound, Product, ProductDetails } from "./Pages";


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/cart" element={<CartPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/orders" element={<AdminOrders />} />
        </Route>

        <Route path="/auth" element={<Auth />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

// ProtectedRoute.js
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./components/Hooks/Context";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  // Show a loading state while Firebase is checking the auth state
  if (loading) return <div>Loading...</div>;

  // If the user is not logged in, redirect them to the login page
  if (!user) {
    return <Navigate to="/auth" />;
  }

  // If the user is authenticated, render the protected route
  return <Outlet />;
};


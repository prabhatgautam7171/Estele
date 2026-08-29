import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignIn from "./components/auth/SignIn";
import Home from "./components/Home";
import VerifyOTP from "./components/auth/VerifyOTP";
import Products from "./pages/Products";
import ProductsDetails from "./pages/ProductsDetails";
import Checkout from "./pages/Checkout";
import AdminSignIn from "./components/admin/SignIn";
import AdminRegister from "./components/admin/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/signin" element={<SignIn />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />

        <Route
          path="/admin/login"
          element={<AdminSignIn />}
        />

        <Route
          path="/admin/register"
          element={<AdminRegister />}
        />

        <Route path="/products" element={<Products />} />
        <Route
          path="/products/:id"
          element={<ProductsDetails />}
        />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;

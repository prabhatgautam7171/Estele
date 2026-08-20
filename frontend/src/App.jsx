import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignIn from "./components/auth/SignIn";
import Home from "./components/Home";
import VerifyOTP from "./components/auth/VerifyOTP";
import Products from "./pages/Products";
import ProductsDetails from "./pages/ProductsDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/signin" element={<SignIn />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/products" element={<Products />} />
        <Route
          path="/products/:id"
          element={<ProductsDetails />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

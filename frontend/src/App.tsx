import { Toaster } from "react-hot-toast";
import Home from "./pages/Home/page";
import { Route, Routes } from "react-router-dom";
import Product from "./pages/Product/page";
import Shop from "./pages/Shop/page";
import Cart from "./pages/Cart/page";
import NotFoundPage from "./pages/NotFoundPage";
import StoreLayout from "./layouts/StoreLayout";
import AuthLayout from "./layouts/AuthLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./pages/Login/page";
import SignUp from "./pages/SignUp/page";
import Checkout from "./pages/Checkout/page";
import Contact from "./pages/Contact/page";

const App = () => {
  return (
    <>
      <Toaster />

      <Routes>
        <Route element={<StoreLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop/:category?" element={<Shop />} />
          <Route path="/product/:slug" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Container className="bg-primary border-t border-t-[rgba(0,0,0,0.17)]">
        <Footer />
      </Container>
    </>
  );
};

export default App;

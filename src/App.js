import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import OurStore from "./pages/OurStore";
import Blog from "./pages/Blog";
import CompareProduct from "./pages/CompareProduct";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Forgotpassword from "./pages/Forgotpassword";
import Signup from "./pages/Signup";
import Resetpassword from "./pages/Resetpassword";
import SingleBlog from "./pages/SingleBlog";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPloicy from "./pages/RefundPloicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import TermAndContions from "./pages/TermAndContions";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OpenRoute from "./routings/OpenRoute";
import PrivateRouter from "./routings/PrivateRouter";
import Myorder from "./pages/user/Myorder";
import MyProfile from "./pages/user/MyProfile";
import LayoutUser from "./pages/user/Layout";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="product" element={<OurStore />} />
            <Route path="product/:id" element={<SingleProduct />} />
            <Route path="blogs" element={<Blog />} />
            <Route path="blog/:id" element={<SingleBlog />} />
            <Route path="cart" element={
              <PrivateRouter>
                <Cart />
              </PrivateRouter>
            } />


            <Route path="/" element={
              <PrivateRouter>
                <LayoutUser />
              </PrivateRouter>
            }>
              <Route path="myorders" element={

                <Myorder />

              } />
              <Route path="my-profile" element={

                <MyProfile />

              } />
            </Route>
            <Route path="checkout" element={<PrivateRouter>
              <Checkout />
            </PrivateRouter>} />
            <Route path="compare-product" element={<CompareProduct />} />
            <Route path="wishlist" element={<PrivateRouter>
              <Wishlist />
            </PrivateRouter>} />
            <Route path="login" element={
              <OpenRoute>
                <Login />
              </OpenRoute>} />
            <Route path="forgot-password" element={<Forgotpassword />} />
            <Route path="signup" element={<OpenRoute>
              <Signup />
            </OpenRoute>} />
            <Route path="reset-password" element={<Resetpassword />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="refund-policy" element={<RefundPloicy />} />
            <Route path="shipping-policy" element={<ShippingPolicy />} />
            <Route path="term-conditions" element={<TermAndContions />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

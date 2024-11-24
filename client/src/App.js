import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Home from "./scenes/home/Home";
import ItemDetails from "./scenes/itemDetails/ItemDetails";
import Checkout from "./scenes/checkout/Checkout";
import Confirmation from "./scenes/checkout/Confirmation";
import Navbar from "./scenes/global/Navbar";
import CartMenu from "./scenes/global/CartMenu";
import Footer from "./scenes/global/Footer";
import SignIn from "./scenes/Signin/Signin";
import SignUp from "./scenes/Signup/Signup";
import Profile from "./scenes/Profile/Profile";
import { getToken } from "./helpers";

const getPaymentStatus = () =>
  localStorage.getItem("paymentStatus") === "success";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="item/:documentId" element={<ItemDetails />} />
          <Route path="checkout/:documentId" element={<Checkout />} />
          <Route
            path="checkout/success"
            // element={
            //   getPaymentStatus() ? <Confirmation /> : <Navigate to="/" />
            // }
            element={<Confirmation />}
          />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/profile"
            element={getToken() ? <Profile /> : <Navigate to="/signin" />}
          />
        </Routes>
        <CartMenu />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

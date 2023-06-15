import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Cart from './components/CartPage/index';
import Checkout from "./components/Checkout/Checkout";
import MainContext from "./components/Context/Context";
import FAQ from "./components/FAQ/index";
import BikeList from './components/USER/BikeList';
import CreateBike from './components/USER/CreateBike';
import ForgetPassword from "./components/USER/ForgetPassword";
import Login from './components/USER/LogIn';
import Profile from './components/USER/Profile';
import Signup from './components/USER/SignUp';
import WishList from './components/WishList';
import AboutUs from "./components/aboutus/index";
import Backdrop from "./components/backdrop/BackDrop";
import Blogs from "./components/blog/Blogs";
import Post from "./components/blog/PostComp/Post";
import Body from "./components/body/body";
import BookingForm from "./components/booking/index";
import Footer from "./components/footer/footer";
import Headers from "./components/header/index";
import Home from "./components/home/index";
import ProductDetail from "./components/productDetail/productDetail";
import UseBikes from "./components/useBikes/index";
import VendorProduct from "./components/vendor/comp/vendorProduct";
import VendorList from "./components/vendor/vendorList";
import NotFound from "./utiles/NotFound";
import MyOrders from './components/USER/MyOrders/index';

function App() {
  return (
    <div className="App">
      <MainContext>
        <Router>
          <Headers />
          <Backdrop />
          <Routes>
            <Route path="/news" element={<Blogs />} />
            <Route exact path="/news/:id" element={<Post />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/help&support" element={<FAQ />} />
            <Route path="/productdetailpage/:id" element={<ProductDetail />} />
            <Route path="/vendorlist" element={<VendorList />} />
            <Route path="/" element={<Home />} />
            <Route path="/brand/:brand" element={<Body />} />
            <Route path="/vendordetailpage/:id" element={<VendorProduct />} />
            <Route path="/advancebooking" element={<BookingForm />} />
            <Route path="/usebikes" element={<UseBikes />} />
            <Route path="/spareParts" element={<UseBikes />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<WishList />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={<CreateBike />} />
            <Route path="/mylist" element={<BikeList />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/checkout/:id" element={<Checkout />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <a
            href="https://wa.me/9203067003056"
            className="whatsapp_float"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-whatsapp fa-2x"></i>
          </a>
          <Footer />
        </Router>
      </MainContext>
    </div>
  );
}

export default App;

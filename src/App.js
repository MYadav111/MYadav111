import AdminLogin from "./components/admin/adminlogin/AdminLogin"
import Dashboard from "./components/admin/adminlogin/Dashboard";
import HomePage from "./components/userinterface/homepage/HomePage";
import PageCategoryDisplay from "./components/userinterface/PageCategory/PageCategoryDisplay";
import UserLogin from "./components/userinterface/userlogin/UserLogin";
import ProductCategoryShow from "./components/userinterface/productcategory/ProductCategoryShow"
import AllCatgory from "./components/userinterface/Allcategory/AllCategory";
import CartDisplayPage from "./components/userinterface/mycart/CartDisplayPage"
import Login from "./components/userinterface/userlogin/Login"
import Otp from "./components/userinterface/userlogin/Otp"
import SetUp from "./components/userinterface/userlogin/SetUp"
import PaymentDetails from "./components/userinterface/mycart/PaymentDetails";
// import MakePayment from "./components/userinterface/mycart/MakePayment";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<AdminLogin/>} path="/adminlogin"></Route>
          <Route element={<Dashboard/>} path="/dashboard/*"></Route>
          <Route element={<UserLogin/>} path="/userlogin"></Route>
          <Route element={<HomePage/>} path="/homepage"></Route>
          <Route element={<PageCategoryDisplay/>} path="/pagecategorydisplay"></Route>
          <Route element={<ProductCategoryShow/>} path="/productcategoryshow"></Route>
          <Route element={<AllCatgory/>} path="/allcategory"></Route>
          <Route element={<CartDisplayPage/>} path="/cartdisplaypage"></Route>
          <Route element={<Login/>} path="/login"></Route>
          <Route element={<Otp/>} path="/otp"></Route>
          <Route element={<SetUp/>} path="/setup"></Route>
          <Route element={<PaymentDetails/>} path="/paymentdetails"></Route>
          {/* <Route element={<MakePayment/>} path="/makepayment"></Route> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;

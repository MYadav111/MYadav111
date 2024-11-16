import AdminLogin from "./components/admin/adminlogin/AdminLogin"
import Dashboard from "./components/admin/adminlogin/Dashboard";
import HomePage from "./components/userinterface/homepage/HomePage";
import PageCategoryDisplay from "./components/userinterface/PageCategory/PageCategoryDisplay";
import UserLogin from "./components/userinterface/userlogin/UserLogin";
import ProductCategoryShow from "./components/userinterface/productcategory/ProductCategoryShow"
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
        </Routes>
      </Router>
    </div>
  );
}

export default App;

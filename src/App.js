import logo from "./logo.svg";
import "./App.css";
import Home from "./Components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Insert from "./Components/Insert";
import Login from "./Components/Login";
import Edit from "./Components/Update";
import Mymanage from "./Components/khachhang";
import Detail from "./Components/detailproduct";
import Cart from "./Components/cart";
import Viewproduct from "./Components/admin/product";
import AdminHeaderAndFooterWrapper from "./layout/adminheaderandfooterwrapper";
import HeaderAndFooterWrapper from "./layout/headerandfooterwrapper";
import Category from "./Components/admin/category";

function App() {
  const isAdminRoute = (pathname) => pathname.startsWith("/admin");

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/*"
            element={
              isAdminRoute(window.location.pathname) ? (
                <AdminHeaderAndFooterWrapper>
                  <Routes>

                    <Route path="/admin/*" element={<Viewproduct />} /> {/* Sử dụng nested layout cho khu vực /admin */}
                    <Route path="/admin/viewcategory" element={<Category />} />
                  </Routes>
                </AdminHeaderAndFooterWrapper>
              ) : (
                <HeaderAndFooterWrapper>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/create" element={<Insert />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Edit" element={<Edit />} />
                    <Route path="/khachhang/view" element={<Mymanage />} />
                    <Route path="/Detail/:getid" element={<Detail />} />
                    <Route path="/shopingcart" element={<Cart />} />
                    <Route path="/admin/*" element={<Viewproduct />} /> {/* Sử dụng nested layout cho khu vực /admin */}
                  </Routes>
                </HeaderAndFooterWrapper>
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

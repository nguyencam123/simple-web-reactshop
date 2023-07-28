import "./App.css";
import Home from "./Components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Insert from "./Components/Insert";
import LoginForm from "./Components/Login";
import Edit from "./Components/Update";
import Mymanage from "./Components/khachhang";
import Detail from "./Components/detailproduct";
import Cart from "./Components/cart";
import Viewproduct from "./Components/admin/product";
import AdminHeaderAndFooterWrapper from "./layout/adminheaderandfooterwrapper";
import HeaderAndFooterWrapper from "./layout/headerandfooterwrapper";
import Category from "./Components/admin/category";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import PrivateAdminRoutefunction from "./PrivateAdminRoute";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Hàm kiểm tra xem người dùng đã đăng nhập và có quyền admin hay không
  const checkLoginStatus = () => {
    // Kiểm tra xem có thông tin đăng nhập đã lưu trong localStorage hay không
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    const isAdminStatus = localStorage.getItem('isAdmin');

    setIsLoggedIn(loggedInStatus === 'true');
    setIsAdmin(isAdminStatus === 'true');
  };

  // Gọi hàm kiểm tra trạng thái đăng nhập khi component App() được render
  useEffect(() => {
    checkLoginStatus();
  }, []);

  //Cập nhật isAdminRoute bất cứ khi nào isLoggedIn hoặc isAdmin thay đổi
  const isAdminRoute = (pathname) => {
    return pathname.startsWith('/admin');
  };


  useEffect(() => {
    isAdminRoute(window.location.pathname);
  }, [isLoggedIn, isAdmin]);

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
                    <Route path="/Login" element={<LoginForm />} />
                    <Route path="/Edit" element={<Edit />} />
                    <Route path="/khachhang/view" element={<Mymanage />} />
                    <Route path="/Detail/:getid" element={<Detail />} />
                    <Route path="/shopingcart" element={<Cart />} />
                    {/* Sử dụng nested layout cho khu vực /admin */}
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

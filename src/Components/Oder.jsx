import React, { useContext } from 'react';
import { AuthContext } from './Login';

function Order() {
  const { loggedIn, user } = useContext(AuthContext);

  if (loggedIn) {
    // Người dùng đã đăng nhập
    // Ví dụ: hiển thị thông tin đăng nhập
    return <p>Welcome, {user.name}!</p>;
  } else {
    // Người dùng chưa đăng nhập
    // Ví dụ: yêu cầu đăng nhập trước khi đặt hàng
    return <p>Please log in to place an order.</p>;
  }
}
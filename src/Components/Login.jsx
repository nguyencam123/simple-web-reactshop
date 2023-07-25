import React, { useState } from 'react';
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
}
  from 'mdb-react-ui-kit';
import axios from 'axios';
import "./login.css";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [justifyActive, setJustifyActive] = useState('tab1');;

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

  const handleSubmit = async () => {
    try {
      // Gửi yêu cầu đăng nhập đến API với username và password từ state của bạn
      const response = await axios.post('http://localhost:8080/api/viewaccount', {
        username: username,
        password: password,
      });

      // Lấy danh sách tài khoản từ phản hồi API
      const accounts = response.data;

      // Kiểm tra xem thông tin đăng nhập có khớp với bất kỳ tài khoản nào trong danh sách không
      const matchedAccount = accounts.find((account) => account.username === username && account.password === password);

      if (matchedAccount) {
        if (matchedAccount.admin === 0) {
          // Đăng nhập thành công với vai trò user
          window.location.href = 'http://localhost:3000';
        } else {
          // Đăng nhập thành công với vai trò admin
          window.location.href = 'http://localhost:3000/admin';
        }
      } else {
        // Thông báo đăng nhập không thành công nếu thông tin không khớp với bất kỳ tài khoản nào trong danh sách
        alert('Đăng nhập không thành công. Vui lòng kiểm tra lại tài khoản và mật khẩu.');
      }
    } catch (error) {
      console.error('Đăng nhập thất bại:', error);
    }
  };

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
            Login
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
            Register
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>
      <MDBTabsContent>
        <MDBTabsPane show={justifyActive === 'tab1'}>
          <div className="text-center mb-3">
            <p>Sign in with:</p>
          </div>
          <MDBInput wrapperClass='mb-4' label='Email address' type='email' required
            onChange={(e) => setUsername(e.target.value)} />
          <MDBInput wrapperClass='mb-4' label='Password' type='password' required
            onChange={(e) => setPassword(e.target.value)} />
          <div className="d-flex justify-content-between mx-4 mb-4">
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
            <a href="!#">Forgot password?</a>
          </div>
          <MDBBtn className="mb-4 w-100 custom-button" onClick={handleSubmit}>Sign in</MDBBtn>

          <p className="text-center">Not a member? <a href="#!">Register</a></p>
        </MDBTabsPane>
        <MDBTabsPane show={justifyActive === 'tab2'}>
          <div className="text-center mb-3">
            <p>Sign un with:</p>
            <div className='d-flex justify-content-between mx-auto' style={{ width: '40%' }}>
              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='facebook-f' size="sm" />
              </MDBBtn>
              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='twitter' size="sm" />
              </MDBBtn>
              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='google' size="sm" />
              </MDBBtn>
              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='github' size="sm" />
              </MDBBtn>
            </div>
            <p className="text-center mt-3">or:</p>
          </div>
          <MDBInput wrapperClass='mb-4' label='Name' id='form1' type='text' />
          <MDBInput wrapperClass='mb-4' label='Username' id='form1' type='text' />
          <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email' />
          <MDBInput wrapperClass='mb-4' label='Password' id='form1' type='password' />
          <div className='d-flex justify-content-center mb-4'>
            <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms' />
          </div>
          <MDBBtn className="mb-4 w-100 custom-button" onClick={handleSubmit}>Sign up</MDBBtn>
        </MDBTabsPane>
      </MDBTabsContent>
    </MDBContainer>
  );
}

export default Login;
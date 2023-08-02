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
import { useEffect } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernamesignup, setUsernamesignup] = useState('');
  const [passwordsignup, setPasswordsignup] = useState('');
  const [email, setEmail] = useState("");
  const [fullname, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [justifyActive, setJustifyActive] = useState('tab1');
  //

  const [empdata, empdatachange] = useState([])
  const name = localStorage.getItem('username')
  useEffect(() => {
    fetch(`http://localhost:8080/api/oder/serbyuseroderdetail?username=${name}`)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        empdatachange(resp);
        console.log(resp);
      })
      .catch((err) => {
        console.log(err.massage);
      });
  }, []);

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
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('isAdmin', 'false');
          localStorage.setItem('username', matchedAccount.username)
          window.location.href = 'http://localhost:3000';
        } else {
          // Đăng nhập thành công với vai trò admin
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('isAdmin', 'true');
          localStorage.setItem('username', matchedAccount.username)
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
  const addaccount = () => {
    const newcategory = {
      username: usernamesignup,
      password: passwordsignup,
      email: email,
      fullname: fullname,
    };

    return fetch("http://localhost:8080/api/account/addaccount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newcategory)
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("thêm thất bại");
      }
    }).then((resp) => {
      setPasswordsignup("");
      setFullName("");
      setEmail("");
    }).catch((err) => {
      console.log(err);
    });
  };

  const addoder = () => {
    const newitems = {
      address: address,
      account: {
        username: usernamesignup
      }
    };

    return fetch("http://localhost:8080/api/addoderdetail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newitems)
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("thêm thất bại");
      }
    }).then((resp) => {
      setUsernamesignup("");
      setAddress("");
    }).catch((err) => {
      console.log(err);
    });
  };

  const handleSignUp = () => {
    addaccount()
      .then(() => addoder())
      .catch((err) => {
        console.log(err);
      });
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
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab3')} active={justifyActive === 'tab3'}>
            purchased product
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
          <MDBBtn className="mb-4 w-100 custom-button" onClick={handleSubmit} activeOpacity={1}>Sign in</MDBBtn>

          <p className="text-center">Not a member? <a href="#!">Register</a></p>
        </MDBTabsPane>
        <MDBTabsPane show={justifyActive === 'tab2'}>
          <div className="text-center mb-3">

          </div>
          <MDBInput wrapperClass='mb-4' label='Username' id='form1' type='text' required onChange={(e) => setUsernamesignup(e.target.value)} />
          <MDBInput wrapperClass='mb-4' label='Password' id='form1' type='password' required onChange={(e) => setPasswordsignup(e.target.value)} />
          <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email' required onChange={(e) => setEmail(e.target.value)} />
          <MDBInput wrapperClass='mb-4' label='Name' id='form1' type='text' required onChange={(e) => setFullName(e.target.value)} />
          <MDBInput wrapperClass='mb-4' label='address' id='form1' type='text' required onChange={(e) => setAddress(e.target.value)} />
          <div className='d-flex justify-content-center mb-4'>
            <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms' />
          </div>
          <MDBBtn className="mb-4 w-100 custom-button" onClick={handleSignUp}>Sign up</MDBBtn>
        </MDBTabsPane>
        <MDBTabsPane show={justifyActive === 'tab3'}>
          <table className="table">
            <thead>
              <th>name product</th>
              <th>price</th>
              <th>category</th>
              <th>address</th>
              <th>name</th>
            </thead>
            <tbody>
              {
                empdata.map((item) => (
                  <tr key={item.id}>
                    <td>{item.product.name}</td>
                    <td>{item.price}</td>
                    <td>{item.product.category.name}</td>
                    <td>{item.order.address}</td>
                    <td>{item.order.account.fullname}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </MDBTabsPane>
      </MDBTabsContent>
    </MDBContainer>
  );
}

export default Login;
import Card from "react-bootstrap/Card";
import { useEffect } from 'react';
import React, { useState } from 'react';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBListGroup,
    MDBListGroupItem,
    MDBRipple,
    MDBRow,
    MDBTooltip,
    MDBTypography,
} from "mdb-react-ui-kit";
import "./cart.css";

const Cart = () => {
    // Lấy danh sách sản phẩm từ localStorage khi trang được tải
    const [cartItems, setCartItems] = useState([]);
    useEffect(() => {
        const storedCartItems = localStorage.getItem('cartItems');
        if (storedCartItems) {
            setCartItems(JSON.parse(storedCartItems));
        }
    }, []);

    const removeFromCart = (id) => {
        const updatedCartItems = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };

    // Tính tổng giá trị price trong danh sách cartItems
    const total = cartItems.reduce((accumulator, item) => accumulator + item.price, 0);

    const updateQuantity = (id, newQuantity) => {
        const updatedCartItems = cartItems.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    quantity: newQuantity,
                    price: item.price * newQuantity
                };
            }
            return item;
        });

        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };


    return (
        <div>
            <section className="h-100 gradient-custom">
                <MDBContainer className="py-5 h-100">
                    <MDBRow className="justify-content-center my-4">
                        <MDBCol md="8">
                            <MDBCard className="mb-4">
                                <MDBCardHeader className="py-3">
                                    <MDBTypography tag="h5" className="mb-0">
                                        Cart - {cartItems.length} items
                                    </MDBTypography>
                                </MDBCardHeader>
                                <MDBCardBody>
                                    <MDBRow>

                                        {cartItems.length === 0 ? (
                                            <p>Giỏ hàng trống</p>
                                        ) : (
                                            <ul>
                                                {cartItems.map((item, index) => (

                                                    <li key={index}>
                                                        <MDBRow>
                                                            <MDBCol lg="3" md="12" className="mb-4 mb-lg-0">
                                                                <MDBRipple rippleTag="div" rippleColor="light"
                                                                    className="bg-image rounded hover-zoom hover-overlay">
                                                                    <Card.Img
                                                                        variant="top"
                                                                        src={require(`../assets/${item.img}`)}
                                                                    />
                                                                    <a href="#!">
                                                                        <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.2)", }}>
                                                                        </div>
                                                                    </a>
                                                                </MDBRipple>
                                                            </MDBCol>

                                                            <MDBCol lg="5" md="6" className=" mb-4 mb-lg-0">
                                                                <p>
                                                                    <strong>{item.name}</strong>
                                                                </p>
                                                                <p>loại: {item.category}</p>
                                                                <button type="button" className="btn btn-danger" onClick={() => removeFromCart(item.id)}>
                                                                    Xóa
                                                                </button>
                                                            </MDBCol>
                                                            <MDBCol lg="4" md="6" className="mb-4 mb-lg-0">
                                                                <div className="d-flex mb-4" style={{ maxWidth: "300px" }}>
                                                                    <MDBInput
                                                                        defaultValue={item.quantity}
                                                                        min={0}
                                                                        type="number"
                                                                        label="Quantity"
                                                                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                                                    />

                                                                </div>

                                                                <p className="text-start text-md-center">
                                                                    <strong>{item.price}$</strong>
                                                                </p>
                                                            </MDBCol>
                                                        </MDBRow>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </MDBRow>
                                </MDBCardBody>
                            </MDBCard>

                            <MDBCard className="mb-4">
                                <MDBCardBody>
                                    <p>
                                        <strong>Expected shipping delivery</strong>
                                    </p>
                                    <p className="mb-0">12.10.2020 - 14.10.2020</p>
                                </MDBCardBody>
                            </MDBCard>

                            <MDBCard className="mb-4 mb-lg-0">
                                <MDBCardBody>
                                    <p>
                                        <strong>We accept</strong>
                                    </p>
                                    <MDBCardImage className="me-2" width="45px"
                                        src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                                        alt="Visa" />
                                    <MDBCardImage className="me-2" width="45px"
                                        src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                                        alt="American Express" />
                                    <MDBCardImage className="me-2" width="45px"
                                        src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                                        alt="Mastercard" />
                                    <MDBCardImage className="me-2" width="45px"
                                        src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.png"
                                        alt="PayPal acceptance mark" />
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol md="4">
                            <MDBCard className="mb-4">
                                <MDBCardHeader>
                                    <MDBTypography tag="h5" className="mb-0">
                                        Summary
                                    </MDBTypography>
                                </MDBCardHeader>
                                <MDBCardBody>
                                    <MDBListGroup flush>
                                        <MDBListGroupItem
                                            className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                            Products
                                            <span>${total}</span>
                                        </MDBListGroupItem>
                                        <MDBListGroupItem className="d-flex justify-content-between align-items-center px-0">
                                            Shipping
                                            <span>Gratis</span>
                                        </MDBListGroupItem>
                                        <MDBListGroupItem
                                            className="d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                            <div>
                                                <strong>Total amount</strong>
                                                <strong>
                                                    <p className="mb-0">(including VAT)</p>
                                                </strong>
                                            </div>
                                            <span>
                                                <strong>${total}</strong>
                                            </span>
                                        </MDBListGroupItem>
                                    </MDBListGroup>

                                    <MDBBtn block size="lg">
                                        Go to checkout
                                    </MDBBtn>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>
        </div>

    );
};

export default Cart  
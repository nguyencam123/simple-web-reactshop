import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import "./detailproduct.css"
import Cart from "./cart";

function Detail() {
    const { getid } = useParams();
    const [empdata, empdatachange] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    useEffect(() => {
        const storedCartItems = localStorage.getItem('cartItems');
        if (storedCartItems) {
            setCartItems(JSON.parse(storedCartItems));
        }
    }, []);

    useEffect(() => {
        fetch(`http://localhost:8080/api/viewproductid/${getid}`)
            .then((res) => res.json())
            .then((resp) => {
                empdatachange(resp);
                console.log(typeof resp);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [getid]);

    if (!empdata) {
        // API response not received yet, or empdata is null
        return null; // or show a loading indicator
    }

    if (typeof empdata !== 'object' || Array.isArray(empdata)) {
        return <div>Invalid data received</div>;
    }

    const updateCartItem = (id, newQuantity) => {
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


    const addToCart = () => {
        const existingItem = cartItems.find(item => item.id === empdata.id);
        if (existingItem) {
            const updatedQuantity = existingItem.quantity + 1;
            updateCartItem(existingItem.id, updatedQuantity);
        } else {
            const newItem = { id: empdata.id, name: empdata.name, price: empdata.price, img: empdata.image, quantity: 1, category: empdata.category.name };
            const updatedCartItems = [...cartItems, newItem];
            setCartItems(updatedCartItems);
            localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        }
    };



    return (
        <>
            <div className="bodydetai">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6 col-lg-12">
                            <div className="boderimg">
                                <div className="imgcart"><Card.Img
                                    variant="top"
                                    src={require(`../assets/${empdata.image}`)}
                                /></div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-12">
                            <div className="bodyall">
                                <div className="namespdetail">
                                    Tên sản phẩm: {empdata.name}
                                </div><br /></div>
                            <div className="loaisp">
                                <span className="category-label">&emsp;&emsp;Loại sản phẩm : {empdata.category.name}</span>
                            </div>
                            <div className="loaisp">
                                <span className="category-label">&emsp;&emsp;Giá sản phẩm : {empdata.price}$</span>
                            </div>
                            <div className="buttonsdetail">
                                <span className="category-label">
                                    &emsp;&emsp;
                                    <Link to={"/shopingcart"}><button type="button" class="btn btn-primary" onClick={addToCart}>mua sản phẩm</button></Link>
                                    &emsp;&emsp;
                                    <button type="button" class="btn btn-primary" onClick={addToCart}>thêm vào giỏ hàng</button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div><br />

        </>
    );
}

export default Detail;

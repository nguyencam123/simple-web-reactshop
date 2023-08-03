import { Col, Row, } from "antd";
import "./properties.css"
import { useEffect, useState } from "react";
import { UserOutlined, CalendarOutlined, StarOutlined, DollarOutlined } from '@ant-design/icons';
import Card from "react-bootstrap/Card";

const Propertiesuser = () => {
    const [empdata, empdatachange] = useState([]);
    const name = localStorage.getItem('username');
    const [idoder, setidoder] = useState(null);
    const [orderId, setOrderId] = useState(null);
    const [empdataoder, empdatachangeoder] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/api/oder/serbyuseroderdetail?username=${name}`)
            .then((res) => {
                return res.json();
            })
            .then((resp) => {
                empdatachangeoder(resp);
                console.log(resp);
            })
            .catch((err) => {
                console.log(err.massage);
            });
    }, []);

    useEffect(() => {
        fetch(`http://localhost:8080/api/account/serfullnamebyuser?username=${name}`)
            .then((res) => {
                return res.json();
            })
            .then((rest) => {
                empdatachange(rest);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);


    useEffect(() => {
        fetch(`http://localhost:8080/api/oder/serbyuser?username=${name}`)
            .then((res) => res.json())
            .then((resp) => {
                setidoder(resp); // Update the state with fetched data using setidoder function

                // Assuming resp is an array and contains at least one item
                if (Array.isArray(resp) && resp.length > 0) {
                    setOrderId(resp[0].createdate); // Extract the 'id' from the first item and set it in the orderId state
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return (
        <>
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <div className="columsuser">
                        <div className="userpicture">
                            <UserOutlined className="custom-icon" />
                        </div>
                        <div className="texthello">
                            <h3>Hello</h3>
                        </div>
                        <div className="textnameuser">
                            {empdata.map((item) => (
                                <>{item.fullname}</>
                            ))}
                        </div>
                        <div className="textdate1"><h5>Ngày tham gia</h5></div>
                        <div className="createdate"><CalendarOutlined /></div><div className="createdateoder">{orderId}</div>
                        <div className="textdate2"><h5>hạng thành viên</h5></div>
                        <div className="createdate2"><StarOutlined /></div>
                        <div className="textdate3"><h5>điểm tích lũy</h5></div><div className="createdatettichluy">0</div>
                        <div className="createdate3"><DollarOutlined /></div>
                    </div>
                </Col>
                <Col span={12}><div className="columuerbuy">
                    <div className="orderbyuser">Đơn hàng đã mua</div>
                    <div className="viewtable">
                        <table className="table">
                            <thead>
                                <th>name product</th>
                                <th>price</th>
                                <th>category</th>
                                <th>address</th>
                                <th>img</th>
                                <th>name</th>
                            </thead>
                            <tbody>
                                {
                                    empdataoder && empdataoder.map((item) => (

                                        <tr key={item.id}>
                                            <td>{item.product.name}</td>
                                            <td>{item.price}</td>
                                            <td>{item.product.category.name}</td>
                                            <td>{item.order.address}</td>
                                            <td><Card.Img
                                                variant="top" className="imgcartpro"
                                                src={require(`../assets/${item.product.image}`)}
                                            /></td>
                                            <td>{item.order.account.fullname}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div></Col>
            </Row>
        </>
    )
}
export default Propertiesuser;
import { useState, useEffect } from "react";
import Button from "react-bootstrap/esm/Button"
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from "react-bootstrap/Card";
import "./product.css"

const Viewproduct = () => {
    var [empdata, empdatachange] = useState(null)
    var [name, setname] = useState("")
    var [price, setprice] = useState(0)
    var [image, setimage] = useState("")
    var [category, setcategory] = useState([])
    var [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        fetch("http://localhost:8080/api/product/getall")
            .then((res) => {
                return res.json()
            }).then((resp) => {
                empdatachange(resp)
            }).catch((err) => {
                console.log(err)
            });
    }, []);

    useEffect(() => {
        fetch("http://localhost:8080/api/category/getall")
            .then((res) => {
                return res.json()
            }).then((resp) => {
                setcategory(resp)
            }).catch((err) => {
                console.log(err)
            });
    }, []);

    const handleAddProduct = () => {
        const newProduct = {
            name: name,
            price: price,
            image: image,
            category: category.length > 0 ? category[0] : null

        };

        fetch("http://localhost:8080/api/product/addproduct", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error("Failed to add product");
            })
            .then((resp) => {
                // Thêm sản phẩm mới vào danh sách
                const updatedEmpData = [...empdata, resp];
                empdatachange(updatedEmpData);

                // Reset các giá trị input
                setname("");
                setprice(0);
                setimage("");
                setcategory(null);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleDeleteProduct = (id) => {
        fetch(`http://localhost:8080/api/product/delete/${id}`, {
            method: "DELETE",
        })
            .then((res) => {
                if (res.ok) {
                    // Xóa sản phẩm thành công
                    // Cập nhật danh sách sản phẩm đã xóa
                    const updatedEmpData = empdata.filter((item) => item.id !== id);
                    empdatachange(updatedEmpData);
                } else {
                    throw new Error("Failed to delete product");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <br />
            <Form>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        name
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="text" placeholder="name" required
                            onChange={(e) => setname(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        price
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="text" placeholder="price" required
                            onChange={(e) => setprice(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        image
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="text" placeholder="image" required
                            onChange={(e) => setimage(e.target.value)} />
                    </Col>
                </Form.Group>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
                    loại sản phẩm &emsp;
                    <Form.Select
                        aria-label="Default select example"
                        size="sm"
                        style={{ width: '1000px' }}
                        value={selectedCategory} // Giá trị category được chọn
                        onChange={(e) => setSelectedCategory(e.target.value)} // Cập nhật giá trị category được chọn
                    >
                        <option>Open this select menu</option>
                        {category && category.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </Form.Select>
                </div>

                <Button variant="primary" style={{ float: "left", marginLeft: "150px" }} onClick={handleAddProduct}>thêm</Button>
            </Form>
            <table className="table">
                <thead>
                    <th>id</th>
                    <th>name</th>
                    <th>price</th>
                    <th>loại sản phẩm</th>
                    <th>image</th>
                    <th>view</th>
                </thead>
                <tbody>
                    {empdata && empdata.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.category.name}</td>
                            <td><Card.Img className="imgproduct"
                                variant="top"
                                src={require(`../../assets/${item.image}`)}
                            /></td>
                            <td><Button variant="primary" onClick={() => handleDeleteProduct(item.id)}>xóa</Button>&emsp;
                                <Button variant="primary" >update</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
export default Viewproduct
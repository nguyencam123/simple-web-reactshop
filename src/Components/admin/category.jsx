import React from "react"
import { useState, useEffect } from "react"
import Button from "react-bootstrap/esm/Button"
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';


const Category = () => {
    var [empdata, empdatachange] = useState(null)
    var [name, setname] = useState("")
    var [id, setid] = useState("")
    useEffect(() => {
        fetch("http://localhost:8080/api/category/getall")
            .then((res) => {
                return res.json()
            }).then((data) => {
                empdatachange(data)
            }).catch((err) => {
                console.log(err)
            })
    }, [])

    const handleDeleteCategory = (id) => {
        fetch(`http://localhost:8080/api/category/deletecategory/${id}`, {
            method: "DELETE",
        }).then((res) => {
            if (res.ok) {
                //xóa thành công
                const updatedEmpData = empdata.filter((item) => item.id !== id)
                empdatachange(updatedEmpData)
            }
            else {
                throw new Error("delete fail")
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    const handleAddCategory = () => {
        const newcategory = {
            id: id,
            name: name
        }
        fetch("http://localhost:8080/api/category/addcategory", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newcategory)
        }).then((res) => {
            if (res.ok) {
                return res.json()
            } else {
                throw new Error("thêm thất bại")
            }
        }).then((resp) => {
            const updatedEmpData = [...empdata, resp]
            empdatachange(updatedEmpData);

            setname("");
        }).then((err) => {
            console.log(err)
        })
    }

    return (
        <><br />
            <Form>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        id
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="text" placeholder="id" required
                            onChange={(e) => setid(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        name
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="text" placeholder="name" required
                            onChange={(e) => setname(e.target.value)} />
                    </Col>
                </Form.Group>
            </Form>
            <Button variant="primary" style={{ float: "left", marginLeft: "150px" }} onClick={handleAddCategory}>addcategory</Button><br />
            <table className="table">
                <thead>
                    <th>id</th>
                    <th>name</th>
                    <th>view</th>
                </thead>
                <tbody>
                    {empdata && empdata.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>
                                <Button variant="primary" onClick={() => handleDeleteCategory(item.id)}>delete</Button>&emsp;
                                <Button variant="primary" >update</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
export default Category
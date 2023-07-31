import React from "react"
import { useState, useEffect } from "react"
import Button from "react-bootstrap/esm/Button"
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const Account = () => {
    var [empdata, empdatachange] = useState(null)
    var [email, setemail] = useState("")
    var [usernameaccount, setusernameaccount] = useState("")
    var [passwordaccount, setpasswordaccount] = useState("")
    var [fullname, setfullname] = useState("")
    var [admin, setadmin] = useState("")
    useEffect(() => {
        fetch("http://localhost:8080/api/account/getall")
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
            username: usernameaccount,
            password: passwordaccount,
            email: email,
            fullname: fullname,
            admin: admin
        }
        fetch("http://localhost:8080/api/account/addaccount", {
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

            setusernameaccount("");
            setpasswordaccount("");
            setfullname("");
            setemail("");
            setadmin("");
        }).then((err) => {
            console.log(err)
        })
    }

    return (
        <><br />
            <Form>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        username
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="text" placeholder="username" required
                            onChange={(e) => setusernameaccount(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        password
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="password" placeholder="password" required
                            onChange={(e) => setpasswordaccount(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        fullname
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="text" placeholder="fullname" required
                            onChange={(e) => setfullname(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        email
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="text" placeholder="email" required
                            onChange={(e) => setemail(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        admin
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="text" placeholder="id" required
                            onChange={(e) => setadmin(e.target.value)} />
                    </Col>
                </Form.Group>
            </Form>
            <Button variant="primary" style={{ float: "left", marginLeft: "150px" }} onClick={handleAddCategory}>addaccount</Button><br />
            <table className="table">
                <thead>
                    <th>username</th>
                    <th>password</th>
                    <th>fullname</th>
                    <th>email</th>
                    <th>admin</th>
                    <th>view</th>
                </thead>
                <tbody>
                    {empdata && empdata.map((item) => (
                        <tr key={item.username}>
                            <td>{item.username}</td>
                            <td>{item.password}</td>
                            <td>{item.fullname}</td>
                            <td>{item.email}</td>
                            <td>{item.admin === 0 ? "user" : "admin"}</td>
                            <td>
                                <Button variant="primary" >update</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
export default Account
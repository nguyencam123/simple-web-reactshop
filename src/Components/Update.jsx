import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Employees from "./Employer";
import { v4 as uuid } from "uuid";
import { Link, useNavigate } from "react-router-dom";

function Edit() {
  const [txtid, setId] = useState("");
  const [txtma, setMa] = useState("");
  const [txttuoi, setTuoi] = useState(0);
  const [txtgioitinh, setGioiTinh] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let a = Employees[index];
    a.ma = txtma;
    a.tuoi = txttuoi;
    a.gioitinh = txtgioitinh;
    history("/");
  };
  // khi component được render lần đầu tiên, nó sẽ lấy các giá trị từ localStorage và
  //cập nhật state tương ứng của component để hiển thị các giá trị này cho người dùng.
  useEffect(() => {
    setMa(localStorage.getItem("ma"));
    setTuoi(localStorage.getItem("tuoi"));
    setGioiTinh(localStorage.getItem("gioitinh"));
    setId(localStorage.getItem("id"));
  }, []);

  let history = useNavigate();
  var index = Employees.map(function (e) {
    return e.id;
  }).indexOf(txtid);
  return (
    <>
      <Form className="d-grid gap-2">
        <Form.Group controlId="formMa">
          <Form.Control
            type="text"
            placeholder="Enter Ma"
            required
            onChange={(e) => setMa(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="formtuoi">
          <Form.Control
            type="text"
            placeholder="Enter tuoi"
            required
            onChange={(e) => setTuoi(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="formgioitinh">
          <Form.Control
            type="text"
            placeholder="Enter gioitinh"
            required
            onChange={(e) => setGioiTinh(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <button
          type="submit"
          onClick={(e) => handleSubmit(e)}
          style={{ margin: "10px" }}
          className="btn btn-primary"
        >
          update
        </button>
      </Form>
    </>
  );
}
export default Edit;

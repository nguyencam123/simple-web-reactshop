import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Employees from "./Employer";
import { v4 as uuid } from "uuid";
import { Link, useNavigate } from "react-router-dom";

const Insert = () => {
  const [txtma, setMa] = useState("");
  const [txttuoi, setTuoi] = useState(0);
  const [txtgioitinh, setGioiTinh] = useState("");

  //chuyển hướng đến một trang khác trong ứng dụng
  let history = useNavigate();

  const handleSubmit = (e) => {
    //k nháy lại trang
    e.preventDefault();
    //biến tạo ngẫu nhiên id trong js
    // const ids = uuid();
    // let uniqueId = ids.slice(0, 8);
    let uniqueId = crypto.randomUUID();
    let a = txtma,
      b = txttuoi,
      c = txtgioitinh;
    Employees.push({ id: uniqueId, ma: a, tuoi: b, gioitinh: c });
    history("/");
  };
  return (
    <div>
      {/* required: đây là một thuộc tính boolean, có nghĩa là đầu vào này là bắt buộc phải nhập.
onChange={(e) => setMa(e.target.value)}: đây là một hàm xử lý sự kiện (event handler) được gắn vào đầu vào, 
để xử lý khi giá trị của đầu vào thay đổi. Khi đầu vào thay đổi, hàm này sẽ gọi hàm "setMa" và truyền giá trị 
vừa nhập vào đó, để cập nhật biến "Ma" trong React component. */}
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
          insert
        </button>
      </Form>
    </div>
  );
};
export default Insert;

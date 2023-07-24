import "./manage.css";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";


const Mymanage = () => {
    var [empdata, empdatachange] = useState(null);
    var [makhachhang, setmakhachhang] = useState("");
    var [tenkhachhang, settenkhachhang] = useState("")
    useEffect(() => {
        fetch("http://localhost:8080/khachhang/viewdata")
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
    return (
        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2>Table manage</h2>
                </div>
                <div className="card-body">
                    <table className="table table-bordered">
                        <thead className="bg-white test-white">
                            <th>ID</th>
                            <th>Name</th>
                            <th>delete</th>
                        </thead>
                        <tbody>
                            {empdata &&
                                empdata.map((item) => (
                                    <tr key={item.makhachhang}>
                                        <td>{item.makhachhang}</td>
                                        <td>{item.tenkhachhang}</td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
export default Mymanage
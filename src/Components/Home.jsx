import React from "react";
import Carousel from "react-bootstrap/Carousel";
import firstslide from "../assets/Screenshot 2023-07-03 211459.png";
import secondslide from "../assets/Screenshot 2023-07-11 104801.png";
import thirdslide from "../assets/Screenshot 2023-07-11 104851.png";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";
import "./home.css";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";

function Home() {
  var [empdata, empdatachange] = useState(null);
  var [id, setid] = useState("");
  var [name, setname] = useState("");
  var [price, setprice] = useState("")
  var [image, setimage] = useState("")


  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [searchname, setsearchname] = useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  useEffect(() => {
    fetch("http://localhost:8080/api/viewproduct")
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

  const handleSearchChange = (event) => {
    setsearchname(event.target.value);
  };
  const handleSearch = () => {
    let min, max;

    switch (selectedPriceRange) {
      case '1-10':
        min = 1;
        max = 1000000;
        break;
      case '10-20':
        min = 1000001;
        max = 2000000;
        break;
      case '20+':
        min = 2000001;
        max = 999999999;
        break;
      default:
        min = 0;
        max = 999999999;
    }

    fetch(`http://localhost:8080/api/searchproduct?min=${min}&max=${max}&searchname=${searchname}`)
      .then((res) => res.json())
      .then((data) => {
        empdatachange(data);
        console.log(data)
      })
      .catch((error) => {
        console.log(error);
      });
  };



  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = empdata && empdata.slice(indexOfFirstItem, indexOfLastItem);

  // Thay đổi trang hiện tại
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <>
      {/* slide show */}
      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100" src={firstslide} alt="First slide" />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={secondslide} alt="Second slide" />

          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={thirdslide} alt="Third slide" />

          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      {/*  */}
      <br></br>
      <br></br>
      <div className="container">
        <center>
          <h1>CAMPHONES</h1>
        </center>
      </div>
      <br></br>
      <br></br>
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-4">
            <div className="inputserch">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search" value={searchname} onChange={handleSearchChange}
                />
              </Form><br></br>
              <Form>
                {['radio'].map((type) => (
                  <div key={`inline-${type}`} className="mb-3">
                    <Form.Check
                      inline
                      label="Từ 1 đến 10 triệu"
                      name="group1"
                      type={type}
                      id={`inline-${type}-1`}
                      checked={selectedPriceRange === '1-10'}
                      onChange={() => setSelectedPriceRange('1-10')}
                    />
                    <Form.Check
                      inline
                      label="Từ 10 đến 20 triệu"
                      name="group1"
                      type={type}
                      id={`inline-${type}-2`}
                      checked={selectedPriceRange === '10-20'}
                      onChange={() => setSelectedPriceRange('10-20')}
                    /><br />
                    <Form.Check
                      inline
                      label="Trên 20 triệu"
                      name="group1"
                      type={type}
                      id={`inline-${type}-3`}
                      checked={selectedPriceRange === '20+'}
                      onChange={() => setSelectedPriceRange('20+')}
                    /><br />
                    <Form.Check
                      inline
                      label="Tất cả"
                      name="group1"
                      type={type}
                      id={`inline-${type}-4`}
                      checked={!selectedPriceRange}
                      onChange={() => setSelectedPriceRange('')}
                    />
                  </div>
                ))}
              </Form><br></br>
              <Button variant="outline-success" onClick={handleSearch}>Search</Button>
            </div>
          </div>
          <div className="col-lg-9 col-md-8">
            <div className="card-container">
              {currentItems &&
                currentItems.map((item) => (
                  <div className="col-xl-3 col-lg-4 col-md-6">
                    <div className="carditem">
                      <Card style={{ width: "18rem" }}>
                        <Card.Img
                          variant="top"
                          src={require(`../assets/${item.image}`)}
                        />
                        <Card.Body>
                          <Card.Title>{item.name}</Card.Title>
                          <Card.Text>{item.price}$</Card.Text>
                          <Link to={`/Detail/${item.id}`}>
                            <Button variant="primary">See details</Button>
                          </Link>
                        </Card.Body>
                      </Card>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="pagination">
        {empdata && empdata.length > itemsPerPage && (
          <ul className="pagination-list">
            {Array(Math.ceil(empdata.length / itemsPerPage))
              .fill()
              .map((_, index) => (
                <li
                  key={index}
                  className={`pagination-item ${index + 1 === currentPage ? 'active' : ''
                    }`}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </li>
              ))}
          </ul>
        )}
      </div>
    </>
  );
}
export default Home;

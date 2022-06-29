import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import axios from 'axios';

function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]);
  const [token, setToken] = useState<string>(()=> {
    let sessionToken = sessionStorage.getItem("token")
    return sessionToken ? sessionToken : ""
  });
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    // check if user is logged
    if (!token) navigate("/login", { replace: true });
    else {
      getProducts(1)      
    }
  },[])

  const getProducts = (action:number) => {
    let url = ""
    switch(action){
      case 1:
        url = `http://localhost:${process.env.REACT_APP_API_PORT}/api/v1/products`
        break;
      case 2:
        url = `http://localhost:${process.env.REACT_APP_API_PORT}/api/v1/productsbyprice`
        break;
      default:
        url = `http://localhost:${process.env.REACT_APP_API_PORT}/api/v1/products`
        break;
    }

    let config = {
      headers: {
        Authorization: token
      }
    };

    axios.get(url, config)
      .then((response) => {
        console.log(response.data)
        setProducts(response.data)
      })
      .catch(error => {
        console.error(error.response.data)
      });
  } 

  return (
    <Container className="my-3">
      <Form>
        <Row>
          <Col className="col-sm-12 col-md-2">
            <h4>Products</h4>
          </Col>
          <Col className="col-sm-12 col-md-8">
            <Form.Control type="text" placeholder="Search Items.." onChange={(e) => setSearch(e.target.value)}/>
          </Col>
          <Col className="col-sm-12 col-md-2">
            <Form.Select aria-label="Sort" onChange={(e) => getProducts(+e.target.value)}>
              <option>Sort</option>
              <option value="1">Unsorted</option>
              <option value="2">By Price Asc</option>
            </Form.Select>
          </Col>
        </Row>
      </Form>

      <Row className="my-4">
        {products
        .filter(product => product.name.toLowerCase().includes(search.toLowerCase()))
        .map(product => {
          return (
            <Col className="col-sm-12 col-md-4" key={product.id}>
              <Card style={{minHeight: '100%'}} >
                <Card.Img variant="top" src={product.image_url} className="p-3"/>
                <Card.Body style={{minHeight: '100%'}} className="d-flex flex-column justify-content-end">
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <Card.Text>${product.price}</Card.Text>
                  <Row className="d-grid gap-2">
                    <Button variant="success">Add To Cart</Button>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          )
        })}
      </Row>
    </Container>
  )
}

export default Home
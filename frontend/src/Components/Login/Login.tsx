import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";

import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'

import axios from 'axios';

function Login() {
  const navigate = useNavigate();

  const [validated, setValidated] = useState<boolean>(false);
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const [errorMessage, setErrorMessage] = useState<string[]>();
  const [successMessage, setSuccessMessage] = useState<string>();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      // const url = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/api/v1/users`;
      const url = `http://localhost:${process.env.REACT_APP_API_PORT}/api/v1/auth/login`;

      // new FormData to send as multipart/form to api
      const formData = new FormData();
      if(email) formData.append('email', email);
      if(password) formData.append('password', password);
      
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }

      axios.post(url, formData, config)
        .then((response) => {
          console.log(response.data);
          setSuccessMessage("Login Sucessful")
          sessionStorage.setItem('token', response.data.token);
          setTimeout(() => navigate("/", { replace: true }), 1500);
        })
        .catch(error => {
          console.error(error.response.data)
          let errorString: string[] = []
          for (let errorKey in error.response.data){
            errorString.push(`Error in: ${errorKey} => ${error.response.data[errorKey]}`)
          }
          setErrorMessage(errorString);
        });
    }
    
    setValidated(true);
  };
  return (
    <Container className={"my-3"}>
      {errorMessage && (
        <Alert variant="danger" className='mb-3'>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          {errorMessage.map((error,key) => (
            <p key={key}>{error}</p>
          ))}
        </Alert>
      )}

      {successMessage && (
        <Alert variant="success" className='mb-3'>
          <Alert.Heading>Awesome! </Alert.Heading>
          <p>{successMessage}</p>
        </Alert>
      )}

      <Form validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group controlId="formEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control 
              type="email" 
              placeholder="Enter Email" 
              required  
              onChange={(e) => setEmail(e.target.value)}/>
          </Form.Group>
        </Row>
        
        
        <Row className="mb-3">
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Password" 
              required
              onChange={(e) => setPassword(e.target.value)}/>
          </Form.Group>
        </Row>

        <Row className="d-grid gap-2">
          <Button variant="primary" type="submit" size="lg">Log In</Button>
        </Row>
      </Form>
    </Container>
  )
}

export default Login
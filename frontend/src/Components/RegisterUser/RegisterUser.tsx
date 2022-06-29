import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";

import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'

import axios from 'axios';

function RegisterUser() {
  const navigate = useNavigate();

  const [validated, setValidated] = useState<boolean>(false);
  const [name, setName] = useState<string>();
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>();
  const [address1, setAddress1] = useState<string>();
  const [address2, setAddress2] = useState<string>("");
  const [password, setPassword] = useState<string>();
  const [passwordConfirmation, setPassword2] = useState<string>();
  const [userImage, setUserImage] = useState<any>(null);

  const [errorMessage, setErrorMessage] = useState<string[]>();
  const [successMessage, setSuccessMessage] = useState<string>();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      const url = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/api/v1/users`;

      // new FormData to send as multipart/form to api
      const formData = new FormData();
      if(name) formData.append('user[name]', name);
      if(lastName) formData.append('user[last_name]', lastName);
      if(password) formData.append('user[password]', password);
      if(passwordConfirmation) formData.append('user[password_confirmation]', passwordConfirmation);
      if(email) formData.append('user[email]', email);
      if(address1) formData.append('user[address1]', address1);
      if(address2) formData.append('user[address2]', address2);
      if(userImage) formData.append('user[image]', userImage);

      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }

      axios.post(url, formData, config)
        .then((response) => {
          console.log(response.data);
          setSuccessMessage("User Created, Redirecting...")
          setTimeout(() => navigate("/login", { replace: true }), 2000);
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
          <Form.Group controlId="formName" as={Col} md="6" ms="12">
            <Form.Label>Name</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter Name" 
              required
              onChange={(e) => setName(e.target.value)}/>
          </Form.Group>

          <Form.Group controlId="formLastName" as={Col} md="6" ms="12">
            <Form.Label>Last Name</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter Last Name" 
              required 
              onChange={(e) => setLastName(e.target.value)}/>
          </Form.Group>
        </Row>      

        <Row className="mb-3">
          <Form.Group controlId="formAddress1">
            <Form.Label>Address 1</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter Address 1" 
              required
              onChange={(e) => setAddress1(e.target.value)}/>
          </Form.Group>
        </Row>
        
        <Row className="mb-3">
          <Form.Group controlId="formAddress2">
            <Form.Label>Address 2</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter Address 2" 
              onChange={(e) => setAddress2(e.target.value)}/>
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
        
        <Row className="mb-3">
          <Form.Group controlId="formPasswordConfirmation">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Password Confirmation" 
              required
              onChange={(e) => setPassword2(e.target.value)}/>
          </Form.Group>
        </Row>

        <Row className="mb-4">
          <Form.Group controlId="formImage">
            <Form.Label>Profile Image</Form.Label>
            <Form.Control 
              type="file" 
              accept="image/jpeg, image/png, image/gif"
              onChange={(e) => setUserImage((e.target as HTMLInputElement).files![0])}/>
          </Form.Group>
        </Row>

        <Row className="d-grid gap-2">
          <Button variant="primary" type="submit" size="lg">Register</Button>
        </Row>
      </Form>
    </Container>
  )
}

export default RegisterUser
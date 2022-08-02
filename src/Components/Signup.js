// Modules
import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'

const Signup = ({ submit }) => {
  const navigate = useNavigate()

  const handleClose = () => {
    navigate("/")
  };

  const INIT_STATE = {
    first_name: "Peter",
    last_name: "Manning",
    email: "peter.m@gmail.com",
    password: "password",
  };
  const [formData, setFormData] = useState(INIT_STATE);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    submit(formData)
    setFormData(INIT_STATE)
    handleClose()
  }

  const inputStyle = {
    marginTop: '1rem',
    display: 'flex'
  }

  return (
    <div className="signup-main">
      <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={true}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Signup</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={inputStyle}>First Name</Form.Label>
              <Form.Control
                type="text"
                name="first_name"
                placeholder="John"
                value={formData.first_name}
                onChange={handleChange}
              />
              <Form.Label style={inputStyle}>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                placeholder="Doe"
                value={formData.last_name}
                onChange={handleChange}
              />
              <Form.Label style={inputStyle}>Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="user@domain.com"
                value={formData.email}
                onChange={handleChange}
              />
              <Form.Label style={inputStyle}>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button style={{padding: ".5rem 3rem"}} onClick={handleSubmit} variant="success">Signup</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Signup;

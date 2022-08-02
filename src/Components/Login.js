// Modules
import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'

const Login = ({ submit }) => {
  const navigate = useNavigate()


  const handleClose = () => {
    navigate("/")
  };

  const INIT_STATE = {
    email: "peter.m@gmail.com",
    password: "password"
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
    <div className="login-main">
      <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={true}
        onHide={handleClose}
        bg="dark"
      >
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={inputStyle}>Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                autoFocus
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
          <Button style={{padding: ".5rem 3rem"}} onClick={handleSubmit} variant="success">Login</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Login;

// Modules
import { useState } from "react";
import { Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = ({ submit }) => {
  const navigate = useNavigate();

  const INIT_STATE = {
    email: "john.doe@domain.com",
    password: "password",
  };
  const [formData, setFormData] = useState(INIT_STATE);

  // Close modal
  const handleClose = () => {
    navigate("/");
  };

  // Handle input changes
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = () => {
    submit(formData);
    setFormData(INIT_STATE);
    handleClose();
  };

  // Styles
  const inputStyle = {
    marginTop: "1rem",
    display: "flex",
  };

  return (
    <div className="login-main">
      <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={true}
        onHide={handleClose}
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
          <button type="submit" className="primary-btn" onClick={handleSubmit}>
            Login
          </button>
        </Modal.Footer>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <p>
            Demo Account
            <br />
            Email: john.doe@domain.com
            <br />
            Password: password
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default Login;

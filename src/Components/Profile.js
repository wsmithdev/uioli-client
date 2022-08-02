// Modules
import { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// Context
import UserContext from "../UserContext";
import { useContext } from "react";
// CSS
import "./Styles/Profile.css";

const Profile = ({ submit }) => {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const INIT_STATE = {
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
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
    submit(formData);
    navigate("/");
  };

  const inputStyle = {
    marginTop: '1rem',
    display: 'flex'
  }

  return (
    <div className="profile-main">
      <Card
      
      >
       
        <Card.Body>
          <Card.Title>{user.first_name} {user.last_name}</Card.Title>
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
            </Form.Group>
            <Button style={{padding: ".5rem 3rem"}} onClick={handleSubmit} variant="success">
              Save
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Profile;

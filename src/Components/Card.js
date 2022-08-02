import {
  Card,
  Dropdown,
  Button,
  Col,
  Row,
  ListGroup,
  Popover,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Styles/Card.css";
import { useEffect, useState } from "react";

import Api from "../api";
import useLocalStorage from "../Hooks/useLocalStorage";


import { FaBell, FaBellSlash, FaTrash } from "react-icons/fa";

const CreditCard = ({ card, removeCard }) => {
  console.log(card)
  const [user, setUser] = useLocalStorage("user", {});
  const [freq, setFreq] = useState(null);
  const [nextUse, setNextUse] = useState(null);
  const [notifications, setNotifications] = useState(card.notifications);



  useEffect(() => {
    if (card.days) setFreq(card.days);
    if (card.next_use) setNextUse(card.next_use);
  }, []);

  // Update usage frequency handler
  const handleUpdateFreq = async (days) => {
    try {
      const res = await Api.updateFreq(user, days, card.id);
      setFreq(() => res.freq);
      setNextUse(() => res.nextUse);
    } catch (err) {
      console.log(err);
    }
  };

  // Toggle notifications handler
  const handleToggleNotifications = async () => {
    try {
      const res = await Api.toggleNotifications(user, card.id);
      if (res.notifications === true || res.notifications === false) {
        setNotifications((n) => !n);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Remove card handler
  const handleRemoveCard = (data) => {
    removeCard(card.id);
  };

  // Days remaining
  let days_remaining = Math.round(card.next_use)
 

  return (
    <Card>
      <Card.Body>
        <div className="card-header-section">
          <span className="card-name-type">
            {card.bank_name} {card.card_name}
          </span>

          <Dropdown onSelect={(days) => handleUpdateFreq(days)}>
            <span>Usage frequency:</span>
            <Dropdown.Toggle id="dropdown-autoclose-true" variant="" size="sm">
              {freq ? freq : "Select frequency"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey={7}>7 days</Dropdown.Item>
              <Dropdown.Item eventKey={14}>14 days</Dropdown.Item>
              <Dropdown.Item eventKey={21}>21 days</Dropdown.Item>
              <Dropdown.Item eventKey={30}>30 days</Dropdown.Item>
              <Dropdown.Item eventKey={90}>90 days</Dropdown.Item>
              <Dropdown.Item eventKey={180}>180 days</Dropdown.Item>
              <Dropdown.Item eventKey={365}>365 days</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <div style={{ flexGrow: 1 }}></div>
          <button
            onClick={handleToggleNotifications}
            className={`btn-notifications ${
              notifications ? "notifications-on" : ""
            }`}
          >
            {notifications ? <FaBell /> : <FaBellSlash />}
          </button>
          <button onClick={handleRemoveCard} className="btn-trash">
            <FaTrash />
          </button>
        </div>
      
    
        <Card.Title>Days Remaining: {days_remaining > 0 ? days_remaining : "Overdue"}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default CreditCard;

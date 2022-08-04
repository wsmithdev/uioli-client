// Modules
import { useState } from "react";
import useLocalStorage from "../Hooks/useLocalStorage";
import { confirmAlert } from "react-confirm-alert";

// Components
import { Card, Dropdown } from "react-bootstrap";
import toast from "../toasts";
import Api from "../api";

// Styles
import "./Styles/Card.css";
import { FaTrash } from "react-icons/fa";
import "react-confirm-alert/src/react-confirm-alert.css";



const CreditCard = ({ card, removeCard, updateFreq }) => {
  const [user, setUser] = useLocalStorage("user", {});
  const [notifications, setNotifications] = useState(card.notifications);

  // Update usage frequency handler
  const handleUpdateFreq = (days) => {
    updateFreq(days, card.id);
  };

  // Toggle notifications handler
  const handleToggleNotifications = async () => {
    try {
      const res = await Api.toggleNotifications(user, card.id);
      if (res.notifications === true || res.notifications === false) {
        setNotifications((n) => !n);
        if (res.notifications === true) toast(`Reminders on`, "success");
        if (res.notifications === false) toast(`Reminders off`, "success");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Remove card handler
  const handleRemoveCard = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>Remove Card</h1>
            <p>Are you sure that you want to remove this credit card?</p>

            <button
              onClick={() => {
                removeCard(card.id);
                onClose();
              }}
            >
              Yes
            </button>
            <button onClick={onClose}>No</button>
          </div>
        );
      },
    });
  };

  // Days remaining
  let days_remaining = Math.round(card.next_use);
  const useWithin = `Use this card within: ${days_remaining} days`;
  const overdue = `Overdue`;

  return (
    <Card className="card-main">
  
      <Card.Body style={{ padding: "0" }} className="card-top-section">
        <button onClick={handleRemoveCard} className="btn-trash">
          <FaTrash />
        </button>
      </Card.Body>
     
      <Card.Img variant="top" src={require("../Assets/cc.png")} />
 
      <Card.Body>
        <Card.Title>
          {card.bank_name} {card.card_name}
        </Card.Title>
        <Card.Subtitle style={{ marginTop: "10px" }}>
          {days_remaining > 0 ? (
            <span>{useWithin}</span>
          ) : (
            <span className="days-overdue">{overdue}</span>
          )}
        </Card.Subtitle>
        <hr />
        
        <Card.Text>
          <Dropdown onSelect={(days) => handleUpdateFreq(days)}>
            <span>
              Usage frequency:
              <Dropdown.Toggle
                style={{ fontSize: "1.05rem" }}
                id="dropdown-autoclose-true"
                variant=""
                size="sm"
              >
                {card.days ? card.days : "Select"}
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
            </span>
            <button
              className={`btn-notifications ${
                notifications ? "" : "notifications-off"
              }`}
              onClick={handleToggleNotifications}
            >
              {notifications ? `Reminders On` : `Reminders Off`}
            </button>
          </Dropdown>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CreditCard;

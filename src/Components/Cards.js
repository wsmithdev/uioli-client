// Modules
import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
// Components
import Api from "../api";
import Link from "./Link.tsx";
import CreditCard from "./Card";
// Style
import "./Styles/Cards.css";

// Context
import UserContext from "../UserContext";
import { useContext } from "react";

const Cards = ({ sendPublicToken }) => {
  const user = useContext(UserContext);
  const [cards, setCards] = useState([]);
  let linkToken = ''

  // Get all cards from the database
  const getCards = async () => {
    const cards = await Api.getUserCards(user);
    setCards(cards);
  };

  // Get all cards when component loads
  useEffect(() => {
    getCards();
  }, []);

  // Send public token to the server and get all cards
  const handleSendPublicToken = async (token) => {
    await sendPublicToken(token);
    getCards();
  };

  // Remove card
  const handleRemoveCard = async (id) => {
    try {
      const res = await Api.removeCard(user, id);
      if (res.id) {
        getCards();
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Update usage frequency handler
  const handleUpdateFreq = async (days, card_id) => {
    try {
      const res = await Api.updateFreq(user, days, card_id);
      if (res.freq) {
        getCards();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="cards-main">
      <span className="cards-title">Credit Cards</span>
      <Link sendPublicToken={handleSendPublicToken} linkToken={linkToken} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          width: "42rem",
        }}
      >
        <Row>
          {cards.length > 0
            ? cards.map((card) => {
                return (
                  <Col
                    key={card.id}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "flex-start",
                    }}
                    md={6}
                  >
                    <CreditCard
                      card={card}
                      removeCard={handleRemoveCard}
                      updateFreq={handleUpdateFreq}
                    />
                  </Col>
                );
              })
            : "No cards added"}
        </Row>
      </div>
    </div>
  );
};

export default Cards;

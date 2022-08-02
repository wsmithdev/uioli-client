// Modules
import { useState, useEffect } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
// Components
import Api from "../api";
import Loading from "./Loading";
import CreditCard from "./Card";
// CSS & Style
import "./Styles/Cards.css";
import { BsSearch } from "react-icons/bs";
// Context
import UserContext from "../UserContext";
import { useContext } from "react";

import PlaidApi from "../plaidApi";

import Link from "./Link.tsx";

const Cards = ({ sendPublicToken, updateFreq }) => {
  const user = useContext(UserContext);
  const [cards, setCards] = useState([]);

  const [linkToken, setLinkToken] = useState("");

  // const getLinkToken = async () => {
  //   const token = await PlaidApi.getLinkToken()
  //   setLinkToken(token)

  // }

  const getCards = async () => {
    const cards = await Api.getUserCards(user);
    setCards(cards);
  };

  useEffect(() => {
    getCards()
  }, [])
  
  // const handleAddCard = async () => {
  //   const res = await PlaidApi.addCard(user)
  //   console.log(res)
  // }

  const handleSendPublicToken = async (token) => {
   await sendPublicToken(token)
   getCards()
  }

  const handleRemoveCard = async (id) => {
    try {
      const res = await Api.removeCard(user, id);
      if (res.id) {
        getCards()
      }
    } catch (err) {
      console.log(err);
    }
  };

 


  return (
    <div className="cards-main">
   <span className="cards-title">Credit Cards</span>
      <ul>
        {cards.length > 0
          ? cards.map((card) => <CreditCard key={card.id} card={card} removeCard={handleRemoveCard}/>)
          : "No cards added"}
      </ul>
      <Link sendPublicToken={handleSendPublicToken} linkToken={linkToken} />
    </div>
  );
};

export default Cards;

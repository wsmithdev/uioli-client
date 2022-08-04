// Modules
import { useNavigate } from "react-router-dom";

// Styles
import "./Styles/Home.css";

// Context
import UserContext from "../UserContext";
import { useContext } from "react";

const Home = () => {
  const navigate = useNavigate();
  const user = useContext(UserContext);

  return (
    <div className="home-main">
      <span className="home-title">Use It Or Lose It</span>
      <span className="home-subtitle">How it works:</span>
      <p>
        Prevent those nasty credit card closures by ensuring that you use your
        credit card enough times during the billing period.
      </p>
      <p>
        Simply link your bank accounts, set the usage frequency and we will let
        you know if you need to use one of your card.
      </p>

      {user.token ? (
        <button
          style={{ marginTop: "2rem" }}
          onClick={() => navigate("/cards")}
          className="primary-btn"
        >
          See your cards
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default Home;

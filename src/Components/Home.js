import "./Styles/Home.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"
// Context


const Home = () => {
  const navigate = useNavigate()





  return (
    <div className="home-main">
      <span className="home-title">Use It Or Lose It</span>
      <span className="home-subtitle">How it works:</span>
      <p>
        Prevent those nasty credit card closures by ensuring that you
        use your credit card enough times during the billing period.
      </p>
      <p>
        Simply link your bank accounts, set the usage frequency and we
        will let you know if you need to use one of your card.
      </p>

      
      <button onClick={() => navigate("/cards")} className="primary-btn">See your cards</button>

     
    </div>
  );
};

export default Home;

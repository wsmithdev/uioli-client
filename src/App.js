// Modules
import { Routes, Route } from "react-router-dom";
import useLocalStorage from "./Hooks/useLocalStorage";
import PlaidApi from "./plaidApi";
// Styles
import "./App.css";
// Components
import Api from "./api";
import Navbar from "./Components/Nav";
import Home from "./Components/Home";
import Cards from "./Components/Cards";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Profile from "./Components/Profile";
import NotFound from "./Components/404";
import ProtectedRoute from "./Components/ProtectedRoute";
import toast from "./toasts";
import UserContext from "./UserContext";

const App = () => {
  const [user, setUser] = useLocalStorage("user", {});

  /* ---- Would love to move these handleX functions out to  different file ---- */

  // Handle user signup
  const handleSignup = async (user) => {
    try {
      const res = await Api.signup(user);

      if (res.token) {
        setUser({ token: res.token, ...res.user });
        toast(`Welcome, ${res.user.first_name}`, "success");
      }
    } catch (e) {
      console.error(`An error occured: ${e}`);
      toast(e, "error");
    }
  };

  // Handle user login
  const handleLogin = async (user) => {
    try {
      const res = await Api.login(user);
      if (res.token) {
        setUser({ token: res.token, ...res.user });
        toast(`Welcome back, ${res.user.first_name}`, "success");
      }
    } catch (e) {
      console.error(`An error occured: ${e}`);
      toast(e, "error");
    }
  };

  // Handle user logout
  const handleLogout = () => {
    Api.token = "";
    setUser("");
    toast("Logout succesful", "success");
  };

  // Handle user profile update
  const handleUpdate = async (data) => {
    console.log(data);
    try {
      const token = user.token;
      const id = user.id;
      const res = await Api.updateUser(data, token, id);

      if (res.first_name) {
        const userInfo = await Api.getUser(id, token);
        setUser({ token, ...userInfo });
        toast("Profile saved", "success");
      }
    } catch (e) {
      console.error(`An error occured: ${e}`);
      toast("Error, please try again", "error");
    }
  };

  // Send plaid public token to the server
  const handleSendPublicToken = async (token) => {
    await PlaidApi.sendPublicToken(token, user);
  };

  // Get user cards
  const handleGetCards = async () => {
    const res = await Api.getUserCards(user);
    return res;
  };

  return (
    <div className="App">
      <UserContext.Provider value={user}>
        <Navbar logout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/cards"
            element={
              <ProtectedRoute>
                <Cards
                  getCards={handleGetCards}
                  sendPublicToken={handleSendPublicToken}
                />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login submit={handleLogin} />} />
          <Route path="/signup" element={<Signup submit={handleSignup} />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile submit={handleUpdate} />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
};

export default App;

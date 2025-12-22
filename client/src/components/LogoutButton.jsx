import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();               // remove token
    navigate("/login");     // redirect to login
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;

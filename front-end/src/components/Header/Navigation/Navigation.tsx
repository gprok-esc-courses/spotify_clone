import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useUserDispatch, useUserState } from "../../../context/Context";
import { Button } from "../../button/Button.component";

const Navigation: React.FC = () => {
  const userDispatch = useUserDispatch();
  const { isLoggedIn } = useUserState();
  const navigate = useNavigate();

  // After logout, clear the context for the user, then navigate to index
  const logOut = () => {
    userDispatch({ type: "RESET_STATE" });
    navigate("/");
  };

  // Check if is user is logged or not
  if (isLoggedIn) {
    return (
      <nav className="navbar navbar-dark bg-dark ">
        <div className="d-flex flex-row-reverse bd-highlight space ms-auto">
          {/* create a responsive btn group */}
          <Link
            to="/home"
            className="btn btn-outline-primary text-light text-opacity-75"
          >
            Home
          </Link>

          <Link
            to="/profile"
            className="btn btn-outline-primary text-white text-opacity-75"
          >
            Profile
          </Link>
        </div>
        <div className="d-grid gap-2">
          <Button text={"logOut"} onClick={logOut} />
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="navbar navbar-dark bg-dark  navbar-custom ">
        <div className="d-flex flex-row-reverse bd-highlight space ms-auto ">
          {/* create a responsive btn group */}
          <Link to="/register" className="btn btn-primary bg-info text-white ">
            Register
          </Link>

          <Link to="/login" className="btn btn-outline-primary text-info ">
            Login
          </Link>

          <Link
            to="/"
            className="btn btn-outline-primary text-light text-opacity-75"
          >
            Index
          </Link>
        </div>
      </nav>
    );
  }
};

export default Navigation;

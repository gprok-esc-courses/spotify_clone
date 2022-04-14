import { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useUserDispatch } from "../../../context/Context";
import { IUserInfoContext, usersDispatchContext } from "../../../Model/models";
import { Button } from "../../button/Button.component";
import { loginAPI } from "../../../API/Api";
import Logo from "../../../images/logo.png";
import "../Auth.css";
import ErrorHandler from "../../ErrorHandler/ErrorHandler";

const Login: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();

  const [errorMessage, setErrorMessage] = useState<any>();

  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const userDispatch: usersDispatchContext = useUserDispatch();

  // Username handler
  const onUsernameChange = (e: React.BaseSyntheticEvent): void => {
    setUserName(e.target.value);
  };
  // Password handler
  const onPasswordChange = (e: React.BaseSyntheticEvent): void => {
    setPassword(e.target.value);
  };

  const handleInputs = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    try {
      const data = await loginAPI(username, password);
      // Check the type of the data is returned, if is string, it contains a message which means error and display error
      // If data is not string, it contains user's information (token, id, email) and the login was successful
      if (typeof data === "string" || data instanceof String) {
        setErrorMessage(data);
      } else if (data) {
        const user: IUserInfoContext = {
          username: data["username"],
          token: data["token"],
        };
        userDispatch({ type: "SET_USER", user: user });
        userDispatch({ type: "SET_IS_LOGGED_IN", isLoggedIn: true });
        // After login, navigate home
        navigate("/home");
      }
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <div className="container flex-column input-container w-50 p-3 border border_style">
      {/* Display error if there is any */}

      <div>
        <img src={Logo} alt="Logo" className="rounded mx-auto d-block " />
      </div>
      <form onSubmit={handleInputs}>
        <label htmlFor="username" className="control-label text">
          <strong>Username:</strong>
        </label>
        <input
          type="text"
          className="form-control email-icon"
          value={username}
          id="username"
          placeholder="Username"
          onChange={onUsernameChange}
          autoComplete="on"
        />
        <br />
        <label htmlFor="password" className="control-label text">
          <strong>Password:</strong>
        </label>
        <input
          type="password"
          value={password}
          className="form-control password-icon"
          id="password"
          onChange={onPasswordChange}
          placeholder="Password"
          autoComplete="on"
        />
        <br />
        <div className="d-grid gap-2">
          <Button text={"Submit"} />
        </div>
      </form>
      {/* Display error if there is any */}
      <div className={ErrorHandler(errorMessage)}>
        <strong>{errorMessage}!</strong>
      </div>
    </div>
  );
};
export default Login;

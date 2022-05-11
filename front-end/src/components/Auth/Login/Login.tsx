import { useState } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { useUserDispatch } from "../../../context/UserContext";
import { IUserInfoContext, usersDispatchContext } from "../../../Model/models";
import { fetchAllAlbumsAPI, loginAPI } from "../../../API/Api";
import Logo from "../../../images/logo.png";
import "../Auth.css";
import {
  PasswordInput,
  Group,
  Button,
  Box,
  TextInput,
  Anchor,
  Center,
  Image,
} from "@mantine/core";
import { AlertComponent } from "../../AlertComponent/AlertComponent";
import ErrorHandler from "../../ErrorHandler/ErrorHandler";
import { useAlbumDispatch } from "../../../context/AlbumContext";

interface IDefaultFormState extends IUserInfoContext {
  password: string | undefined;
}
const Login: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();

  const [errorMessage, setErrorMessage] = useState<any>();

  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const userDispatch: usersDispatchContext = useUserDispatch();

  const albumDispatch = useAlbumDispatch();

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
      const loginApiData = await loginAPI(username, password);
      // Check the type of the data is returned, if is string, it contains a message which means error and display error
      // If data is not string, it contains user's information (token, id, email) and the login was successful
      if (typeof loginApiData === "string" || loginApiData instanceof String) {
        setErrorMessage(loginApiData);
      } else if (loginApiData) {
        const user: IUserInfoContext = {
          username: loginApiData["username"],
          token: loginApiData["access"],
        };
        userDispatch({ type: "SET_USER", user: user });
        userDispatch({ type: "SET_IS_LOGGED_IN", isLoggedIn: true });

        // fetch and save to context all albums from server
        const fetchAlbumApiData = await fetchAllAlbumsAPI(user);
        albumDispatch({ type: "FETCH_ALL_ALBUMS", albums: fetchAlbumApiData["albums"] });
        
        // After login, navigate home
        navigate("/home");
      }
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <Box sx={{ maxWidth: 540 }} mx="auto" className="border">
      <Center>
        <Image radius="md" src={Logo} alt="Logo" />
      </Center>
      <h1 className="title">Log-In</h1>
      <form
        // values: current form values
        onSubmit={handleInputs}
      >
        <TextInput
          required
          label="Username"
          placeholder="John Smith"
          value={username}
          onChange={onUsernameChange}
        />

        <PasswordInput
          required
          label="Password"
          placeholder="Password"
          value={password}
          onChange={onPasswordChange}
          autoComplete="on"
        />
        <Group position="right" mt="md">
          <Button color="green" type="submit">
            Submit
          </Button>
        </Group>

        {/*Display error message if any*/}
        <AlertComponent
          className={ErrorHandler(errorMessage)}
          message={errorMessage}
        />
      </form>
      <Anchor component={Link} to="/register" color={"indigo"}>
        <em>
          <u> Not a member?</u>
        </em>
      </Anchor>
    </Box>
  );
};
export default Login;

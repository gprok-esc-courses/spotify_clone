import { useReducer, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  EActionTypes,
  IAuthCredentials,
  IUserInfoContext,
  usersDispatchContext,
} from "../../../Model/models";
import { registerAPI } from "../../../API/Api";
import Logo from "../../../images/logo.png";
import { useForm } from "@mantine/form";
import { PasswordInput, Group, Button, Box, TextInput } from "@mantine/core";

import "../Auth.css";
import { useUserDispatch } from "../../../context/UserContext";

// Reducer to set credentials for the user
const reducer = (state: IAuthCredentials, action: IAuthCredentials) => {
  switch (action.type) {
    case EActionTypes.SET_EMAIL:
      return { ...state, email: action.email };
    case EActionTypes.SET_NAME:
      return { ...state, username: action.username };
    case EActionTypes.SET_PASSWORD:
      return { ...state, password: action.password };
    case EActionTypes.SET_CONFIRM_PASSWORD:
      return { ...state, passwordRepeat: action.passwordRepeat };
    default:
      return { ...state };
  }
};

const Register: React.FC = () => {
  // Initial state for the user credentials
  const initState: IAuthCredentials = {
    email: undefined,
    username: undefined,
    password: undefined,
    passwordRepeat: undefined,
  };

  const navigate = useNavigate();
  const [internalState, formDispatch] = useReducer(reducer, initState);

  const userDispatch: usersDispatchContext = useUserDispatch();

  // Email handler
  const onEmailChange = (e: React.BaseSyntheticEvent): void => {
    formDispatch({ type: EActionTypes.SET_EMAIL, email: e.target.value });
  };

  const onNameChange = (e: React.BaseSyntheticEvent): void => {
    formDispatch({ type: EActionTypes.SET_NAME, username: e.target.value });
  };

  const handlePassword = (e: React.BaseSyntheticEvent): void => {
    formDispatch({ type: EActionTypes.SET_PASSWORD, password: e.target.value });
  };

  const handleConfirmPassword = (e: React.BaseSyntheticEvent): void => {
    formDispatch({
      type: EActionTypes.SET_CONFIRM_PASSWORD,
      passwordRepeat: e.target.value,
    });
  };

  const handleInputs = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    try {
      const data = await registerAPI(
        `${internalState.email}`,
        `${internalState.username}`,
        `${internalState.password}`,
        `${internalState.passwordRepeat}`
      );

      // Check the type of the data is returned, if is string, it contains a message which means error and display error
      // If data is not string, it contains user's information (token, id, email) and the login was successful
      if (typeof data === "string" || data instanceof String) {
        return null;
      } else if (data) {
        const user: IUserInfoContext = {
          id: data["id"],
          username: data["username"],
          token: data["token"],
        };
        userDispatch({ type: "SET_USER", user: user });
        userDispatch({ type: "SET_IS_LOGGED_IN", isLoggedIn: true });
        navigate("/home");
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const form = useForm({
    // Set the initial value for the form
    initialValues: {
      email: "",
      username: "",
      password: "",
      passwordRepeat: "",
    },
  });
  return (
    <div className="container flex-column input-container border border_style">
      <div>
        <img src={Logo} alt="Logo" className="rounded mx-auto d-block " />
      </div>

      <h1 className="title">Register</h1>
      <Box sx={{ maxWidth: 340 }} mx="auto">
        <form
          // values: current form values
          onSubmit={form.onSubmit((values) =>
            registerAPI(
              values.email,
              values.username,
              values.password,
              values.passwordRepeat
            )
          )}
        >
          <TextInput
            required
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps("email")}
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Password"
            {...form.getInputProps("password")}
          />

          <PasswordInput
            required
            mt="sm"
            label="Confirm password"
            placeholder="Confirm password"
            {...form.getInputProps("passwordRepeat")}
          />

          <Group position="right" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Box>
    </div>
  );
};

/**
 *       
    <Link to="/login" className=" link flex-wrap text-primary ">
        <em>
          <u> Already a member?</u>
        </em>
      </Link>
 */
export default Register;

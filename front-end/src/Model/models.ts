// Interface for the user Context
// Type message for the auth response(if there is an error to display to user, E.G.: "Wrong Password")
export interface IUserInfoContext {
  message?: string | undefined;
  username: string | undefined;
  token: string | undefined;
  id: string | undefined;
}
// Reset Action
interface ResetAction {
  type: "RESET_STATE";
}

//interface for the context's default state
export interface StateInterface {
  user: IUserInfoContext;
  isLoggedIn: boolean;
}
interface setUserAction {
  type: "SET_USER";
  user: IUserInfoContext;
}

interface setLogInUserAction {
  type: "SET_IS_LOGGED_IN";
  isLoggedIn: boolean;
}
// Type for the action for the context

export type TUserAction = setUserAction | setLogInUserAction | ResetAction;

// Type for the dispatch reducer user
export type usersDispatchContext = (action: TUserAction) => void;

// An enum with all the types of actions to use in the registration useReduce
export enum EActionTypes {
  SET_EMAIL = "SET_EMAIL",
  SET_NAME = "SET_NAME",
  SET_PASSWORD = "SET_PASSWORD",
  SET_CONFIRM_PASSWORD = "SET_CONFIRM_PASSWORD",
}

// Interface the the registration
export interface IAuthCredentials {
  type?: EActionTypes;
  email?: string | undefined;
  username?: string | undefined;
  password?: string | undefined;
  passwordRepeat?: string | undefined;
}

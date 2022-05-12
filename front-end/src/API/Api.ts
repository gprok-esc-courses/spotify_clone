import { useUserState } from "../context/UserContext";
import { IUserInfoContext, IAlbumInfoContext } from "../Model/models";

// API call to use when user wants to login
export const loginAPI = async (
  username: string,
  password: string
): Promise<IUserInfoContext | string | null | undefined> => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const data: IUserInfoContext = await response.json();
    if (response.ok) {
      return data;
    } else {
      return data.detail;
    }
  } catch (error) {
    return null;
  }
};

// API call to use when user wants to register
export const registerAPI = async (
  email: string,
  username: string,
  password: string,
  passwordRepeat: string
): Promise<IUserInfoContext | string | null | undefined> => {
  try {
    const response = await fetch("http://localhost:3001/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
        passwordRepeat: passwordRepeat,
      }),
    });
    const data: IUserInfoContext = await response.json();
    if (response.ok) {
      return data;
    } else {
      return data.detail;
    }
  } catch (error) {
    return null;
  }
};

// API to fetch all albums from server
export const fetchAllAlbumsAPI = async (user: IUserInfoContext) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/albums/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    }
  } catch (error) {
    return null;
  }
};

// API to search an album
export const searchAlbumsAPI = async (
  user: IUserInfoContext,
  albumName: string
) => {
  try {
    // Create a form-data request
    const formDataVariable = new FormData();
    formDataVariable.append("term", albumName);

    let fetchHeaders = new Headers();
    fetchHeaders.append("Authorization", `Bearer ${user.token}`);

    const response = await fetch("http://127.0.0.1:8000/api/search/album/", {
      method: "POST",
      headers: fetchHeaders,
      body: formDataVariable,
    });
    const searchedAlbumData = await response.json();
    if (response.ok) {
      return searchedAlbumData;
    }
  } catch (error) {
    return null;
  }
};

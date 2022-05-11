import React from "react";
import { useUserState } from "../../../context/UserContext";
import DisplayAlbums from "../../Content/Albums/DisplayAlbums/DisplayAlbums";
import Search from "../../Content/Search/Search";
import URLError from "../URLError/URLError";

const Home: React.FC = () => {
  const { isLoggedIn } = useUserState();

  if (isLoggedIn) {
    return (
      <div>
        <Search />
        <DisplayAlbums />
      </div>
    );
  } else {
    return (
      <URLError
        navText="No Account found. To proceed, you must be logged-in!"
        navigationPath="/login"
        btnText="Login"
      />
    );
  }
};

export default Home;

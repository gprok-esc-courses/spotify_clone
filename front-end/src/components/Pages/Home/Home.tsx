import React from "react";
import { useUserState } from "../../../context/Context";

const Home: React.FC = () => {
  const { isLoggedIn } = useUserState();

  if (isLoggedIn) {
    return (
      <div>
        <h1>Home</h1>
      </div>
    );
  } else {
    return (
      <div>
        <h1> No Account found! Log-In/Register to proceed!</h1>
      </div>
    );
  }
};

export default Home;

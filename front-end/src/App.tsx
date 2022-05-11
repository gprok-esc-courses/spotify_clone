import Index from "./components/Pages/Index/Index";
import Home from "./components/Pages/Home/Home";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import Profile from "./components/Pages/Profile/Profile";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Navigation from "./components/Header/Navigation/Navigation";
import { UserContextProvider } from "./context/UserContext";
import "./App.css";
import { MantineProvider } from "@mantine/core";
import URLError from "./components/Pages/URLError/URLError";
import { AlbumContextProvider } from "./context/AlbumContext";

const App = () => {
  return (
    <MantineProvider
      theme={{
        fontFamily: `cursive, "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
        "Lucida Sans Unicode", Geneva, Verdana, sans-serif`,
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <BrowserRouter>
        <UserContextProvider>
          <AlbumContextProvider>
          <Navigation />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="*"
              element={
                <URLError
                  statusNumber={404}
                  navText="Sorry, the page you are looking for could not be found."
                  btnText="Go back!"
                  navigationPath="/"
                />
              }
            />
          </Routes>
          </AlbumContextProvider>
        </UserContextProvider>
      </BrowserRouter>
    </MantineProvider>
  );
};

export default App;

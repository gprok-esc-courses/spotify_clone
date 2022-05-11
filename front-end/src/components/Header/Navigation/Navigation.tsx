import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useUserDispatch, useUserState } from "../../../context/UserContext";
import { Logout, Home, User, Login, Pencil } from "tabler-icons-react";
import { Button, Group, Header } from "@mantine/core";
import styles from "./Navigation.module.css";
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
      <Header
        height={70}
        p="md"
        classNames={{
          root: `${styles.bg}`,
        }}
      >
        <Group position="right">
          <Button
            component={Link}
            to="/home"
            radius="md"
            size="md"
            rightIcon={<Home size={16} />}
            uppercase
          >
            Home
          </Button>
          <Button
            rightIcon={<User size={16} />}
            radius="md"
            size="md"
            uppercase
            color="yellow"
            m={1}
            component={Link}
            to="/profile"
          >
            Profile
          </Button>
          <Button
            rightIcon={<Logout size={16} />}
            radius="md"
            color="red"
            size="md"
            uppercase
            component={Link}
            to="/"
            m={1}
            onClick={logOut}
          >
            logOut
          </Button>
        </Group>
      </Header>
    );
  } else {
    return (
      <Header
        height={70}
        p="md"
        classNames={{
          root: `${styles.bg}`,
        }}
      >
        <Group position="right">
          <Button component={Link} to="/" radius="md" size="md" uppercase>
            Index
          </Button>

          <Button
            rightIcon={<Login size={16} />}
            radius="md"
            size="md"
            uppercase
            color="green"
            variant="outline"
            m={1}
            component={Link}
            to="/login"
          >
            Log-In
          </Button>
          <Button
            rightIcon={<Pencil size={16} />}
            radius="md"
            size="md"
            uppercase
            component={Link}
            to="/register"
            color="green"
            m={1}
          >
            Register
          </Button>
        </Group>
      </Header>
    );
  }
};
export default Navigation;

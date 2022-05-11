import { useUserState } from "../../../context/UserContext";
import URLError from "../URLError/URLError";

const Profile: React.FC = () => {
  const { isLoggedIn, user } = useUserState();

  if (isLoggedIn) {
    return <div></div>;
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
export default Profile;

import { Center } from "@mantine/core";
import Logo from "../../../images/logo.png";
import styles from "./Index.module.css";
const Index: React.FC = () => {
  return (
    <Center>
      {/* container for the logo */}
      <div>
        <img src={Logo} alt="Logo" className="rounded mx-auto d-block " />
      </div>
      <div className={`d-flex justify-content-center ${styles.quotes}`}>
        <h2 className="lead">Listening is everything </h2>
      </div>
      <div className={`d-flex justify-content-center ${styles.quotes}`}>
        <h2 className="blockquote">
          <em>Thousands songs and podcast to listen to.</em>
        </h2>
      </div>
    </Center>
  );
};

export default Index;

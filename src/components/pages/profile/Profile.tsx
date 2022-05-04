import { getAuth } from "firebase/auth";
import { SProfileContainer } from "./styles";

const Profile: React.FC = () => {
  const auth = getAuth();

  return <SProfileContainer>В процессе разработки...</SProfileContainer>;
};

export default Profile;

import Alert from "@mui/material/Alert";
import { FIREBASE_ERRORS } from "./../../../common/constants/firebaseErrors";
import useAppContext from "./../../../providers/app-context/AppContext";
import { NETWORK_STATE } from "./../../../common/constants/network";

type Props = {
  error: string | null;
};

const AuthError: React.FC<Props> = ({ error }) => {
  const {
    state: { auth },
  } = useAppContext();

  if (auth.loading === NETWORK_STATE.PENDING) {
    return null;
  }

  if (auth.loading === NETWORK_STATE.REJECTED) {
    return (
      <Alert severity="error" style={{ marginTop: "10px" }}>
        {error === FIREBASE_ERRORS.USER_NOT_FOUND &&
          "Пользователь с таким email не найден"}
        {error === FIREBASE_ERRORS.INVALID_PASSWORD && "Неверный пароль"}
        {error === FIREBASE_ERRORS.TOO_MANY_REQUESTS &&
          "Превышено количество попыток. Подождите 5 минут"}
        {error === FIREBASE_ERRORS.EMAIL_ALREADY_IS_USE &&
          "Email уже используется другим пользователем"}
      </Alert>
    );
  }

  return null;
};

export default AuthError;

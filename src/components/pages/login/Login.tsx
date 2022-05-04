import { SLoginContainer } from "./styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "./schema";
import useAppContext from "./../../../providers/app-context/AppContext";
import { NETWORK_STATE } from "./../../../common/constants/network";
import AuthError from "./AuthError";
import { PUBLIC_ROUTES } from "./../../../common/constants/routes";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

const Login = () => {
  const {
    state: { auth },
    actions,
  } = useAppContext();
  const navigate = useNavigate();

  const isPending = auth.loading === NETWORK_STATE.PENDING;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<{ email: string; password: string }> = (data) =>
    actions.handleLogIn(data);

  const handleClickOnRegistrationButton = () => {
    navigate(PUBLIC_ROUTES.REGISTRATION, { replace: true });
  };

  const user = getAuth().currentUser;

  console.log(user);

  return (
    <SLoginContainer>
      <Typography variant="h4" gutterBottom component="div">
        Авторизация
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              error={errors?.email !== undefined}
              id="standard-basic"
              label="email"
              variant="standard"
              helperText={errors?.email?.message}
              type="text"
              {...field}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              error={errors?.password !== undefined}
              id="standard-basic"
              label="password"
              variant="standard"
              helperText={errors?.password?.message}
              type="password"
              {...field}
            />
          )}
        />
        <Button variant="contained" type="submit" disabled={isPending}>
          Войти
        </Button>
        <Button
          variant="outlined"
          disabled={isPending}
          onClick={handleClickOnRegistrationButton}
        >
          Зарегистрироваться
        </Button>
        <AuthError error={auth.error} />
      </form>
    </SLoginContainer>
  );
};

export default Login;

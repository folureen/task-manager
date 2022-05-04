import { yupResolver } from "@hookform/resolvers/yup";
import { Typography, Button, TextField } from "@mui/material";
import { NETWORK_STATE } from "common/constants/network";
import { PUBLIC_ROUTES } from "common/constants/routes";
import useAppContext from "providers/app-context";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AuthError from "../login/AuthError";
import { registrationSchema } from "./schema";
import { SRegistrationContainer } from "./styles";

const Registration: React.FC = () => {
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
      name: "",
      email: "",
      password: "",
    },
    resolver: yupResolver(registrationSchema),
  });

  const onSubmit: SubmitHandler<{
    name: string;
    email: string;
    password: string;
  }> = (data) => actions.handleRegistration(data);

  const handleBackRoute = () => {
    navigate(PUBLIC_ROUTES.LOGIN, { replace: true });
  };

  return (
    <SRegistrationContainer>
      <Typography variant="h4" gutterBottom component="div">
        Регистрация
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              error={errors?.name !== undefined}
              id="standard-basic"
              label="Имя"
              variant="standard"
              helperText={errors?.name?.message}
              type="text"
              {...field}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              error={errors?.email !== undefined}
              id="standard-basic"
              label="Email"
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
              label="Пароль"
              variant="standard"
              helperText={errors?.password?.message}
              type="password"
              {...field}
            />
          )}
        />
        <Button variant="contained" type="submit" disabled={isPending}>
          Зарегистрироваться
        </Button>
        <Button
          variant="outlined"
          disabled={isPending}
          onClick={handleBackRoute}
        >
          Назад
        </Button>
        <AuthError error={auth.error} />
      </form>
    </SRegistrationContainer>
  );
};

export default Registration;

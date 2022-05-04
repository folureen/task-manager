import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "common/constants/routes";
import MainLayout from "components/layout";
import Login from "components/pages/login/Login";
import Profile from "components/pages/profile";
import Registration from "components/pages/registration";
import Todo from "components/pages/todo";
import useAppContext from "providers/app-context/AppContext";
import { Navigate, Route, Routes } from "react-router-dom";

const MainRoutes = () => {
  const {
    state: { auth },
  } = useAppContext();
  const isAuth = auth.isAuth;
  if (isAuth) {
    return (
      <Routes>
        <Route
          path={PRIVATE_ROUTES.TODO}
          element={<MainLayout main={<Todo />} />}
        />
        <Route
          path={PRIVATE_ROUTES.PROFILE}
          element={<MainLayout main={<Profile />} />}
        />
        <Route
          path="*"
          element={<Navigate to={PRIVATE_ROUTES.TODO} replace />}
        />
      </Routes>
    );
  }
  return (
    <Routes>
      <Route path={PUBLIC_ROUTES.REGISTRATION} element={<Registration />} />
      <Route path={PUBLIC_ROUTES.LOGIN} element={<Login />} />
      <Route path="*" element={<Navigate to={PUBLIC_ROUTES.LOGIN} replace />} />
    </Routes>
  );
};

export default MainRoutes;

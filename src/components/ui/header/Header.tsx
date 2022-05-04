import { Box, Typography, Button, AppBar, Toolbar } from "@mui/material";
import useAppContext from "./../../../providers/app-context/AppContext";
import { useNavigate } from "react-router-dom";
import { PRIVATE_ROUTES } from "common/constants/routes";

const Header = () => {
  const navigate = useNavigate();
  const { actions } = useAppContext();

  const handleLogOut = () => actions.handleLogOut();
  const handleRouteToProfile = () =>
    navigate(PRIVATE_ROUTES.PROFILE, { replace: true });
  const handleRouteToTodo = () => {
    navigate(PRIVATE_ROUTES.TODO, { replace: true });
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todo
          </Typography>
          <Button color="inherit" onClick={handleRouteToTodo}>
            Список дел
          </Button>
          <Button color="inherit" onClick={handleRouteToProfile}>
            Профиль
          </Button>
          <Button color="inherit" onClick={handleLogOut}>
            Выйти
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;

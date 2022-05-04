import ErrorBoundary from "ErrorBoundary";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import MainRoutes from "routes";
import useApp from "./hooks/useApp";
import { AppContext } from "providers/app-context/AppContext";
const App = () => {
  const { state, actions } = useApp();

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppContext.Provider value={{ state, actions }}>
          <MainRoutes />
        </AppContext.Provider>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;

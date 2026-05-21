import { useEffect } from "react";
import { AppRoutes } from "./router/AppRoutes";
import { initAuth } from "./features/auth/initAuth";

function App() {
  useEffect(() => {
    initAuth();
  }, []);

  return <AppRoutes />;
}

export default App;

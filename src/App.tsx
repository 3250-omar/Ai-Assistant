import { Route, Routes } from "react-router";
import Home from "./Pages/Home";
import Chat from "./Pages/Chat";
import Login from "./Pages/Login";
import NavBar from "./Components/NavBar";
import PrivateRoute from "./Components/SubComponents/PrivateRoute";

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Login />} />

          <Route
            path="/chat"
            element={
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </div>
  );
};

export default App;

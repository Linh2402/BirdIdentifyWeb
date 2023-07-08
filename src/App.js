import React, {useEffect} from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import {Container, Grid} from "@mui/material";
import Sidebar from "./components/Sidebar";
import Users from "./pages/Users";
import Birds from "./pages/Birds";
import History from "./pages/History";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import useAuthStore from "./authStore";

function App() {
  const loggedIn = useAuthStore((state) => state.loggedIn);
  const verifyToken = useAuthStore((state) => state.verifyToken);

  useEffect(() => {
    // Kiểm tra tính hợp lệ của token khi App được khởi chạy
    verifyToken().catch((error) => {
      // Xử lý lỗi hoặc logout nếu token không hợp lệ
      console.error(error);
      useAuthStore.setState({loggedIn: false});
      localStorage.removeItem("token");
    });
  }, [verifyToken]);

  return (
    <Router>
      <Container>
        <Grid container>
          {loggedIn && (
            <Grid item xs={2}>
              <Sidebar />
            </Grid>
          )}
          <Grid item xs={loggedIn ? 10 : 12}>
            <Routes>
              {!loggedIn ? (
                <Route path="/login" element={<Login />} />
              ) : (
                <Route path="/login" element={<Navigate to="/" replace />} />
              )}
              <Route path="/" element={<PrivateRoute />}>
                <Route index element={<Dashboard />} />
              </Route>
              <Route path="/users" element={<PrivateRoute />}>
                <Route index element={<Users />} />
              </Route>
              <Route path="/birds" element={<PrivateRoute />}>
                <Route index element={<Birds />} />
              </Route>
              <Route path="/history" element={<PrivateRoute />}>
                <Route index element={<History />} />
              </Route>
            </Routes>
          </Grid>
        </Grid>
      </Container>
    </Router>
  );
}

export default App;

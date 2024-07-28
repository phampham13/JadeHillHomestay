import "./App.css";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Auth from "./pages/Auth/Auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { token } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("authData"));
    if (authData && authData.token) {
      dispatch({
        type: "LOGIN",
        payload: {
          email: authData.email,
          userId: authData.userId,
          token: authData.token,
          role: authData.role,
        },
      });
    }

    const homestay = JSON.parse(localStorage.getItem("homestayData"));
    if (homestay && authData.token) {
      dispatch({
        type: "SET",
        payload: {
          homestays: homestay,
        },
      });
    }
  }, []);

  let routes;

  if (token)
    routes = (
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Redirect to="/dashboard/homestay-management" />
      </Switch>
    );
  else
    routes = (
      <Switch>
        <Route path="/login" component={Auth} />
        <Redirect to="/login" />
      </Switch>
    );

  return (
    <div className="App">
      <BrowserRouter>{routes}</BrowserRouter>
      <ToastContainer
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        limit={5}
        style={{ width: "24rem" }}
      />
    </div>
  );
}

export default App;

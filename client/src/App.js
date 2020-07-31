import React, {Component } from "react";
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import DeckCreator from "./components/DeckCreator";

class App extends Component {
  jwt;
  state = {
    isDark: false,
    isLoggedIn: false,
  };

  toggleTheme = () => {
    localStorage.setItem("theme", JSON.stringify(!this.state.isDark));
    this.setState({ isDark: !this.state.isDark });
  };

  toggleLoggedIn = (bool) => {
    this.setState({ isLoggedIn: bool });
  };

  componentWillMount = () => {
    const theme = localStorage.getItem("theme");
    if (theme) this.setState({ isDark: JSON.parse(theme) });
    this.jwt = localStorage.getItem("auth-token");
    if (this.jwt) return this.toggleLoggedIn(true);
    return this.toggleLoggedIn(false);
  };

  render() {
    const { isDark, isLoggedIn } = this.state;

    return (
      <Router>
        <div className={`App ${isDark ? "dark" : "light"} `}>
          <Navbar
            toggleTheme={this.toggleTheme}
            isLoggedIn={isLoggedIn}
            toggleLoggedIn={this.toggleLoggedIn}
          />
          <Switch>
            <Route path="/" exact>
              <Home
                isLoggedIn={isLoggedIn}
              />
            </Route>

            <ProtectedRoute accessible={!isLoggedIn} path="/signup">
              <SignupForm />
            </ProtectedRoute>
            <ProtectedRoute accessible={!isLoggedIn} path="/login">
              <LoginForm />
            </ProtectedRoute>

            <ProtectedRoute path="/createdeck" accessible={isLoggedIn}>
              <DeckCreator />
            </ProtectedRoute>

            <Route render={() => <Redirect to={{ pathname: "/" }} />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

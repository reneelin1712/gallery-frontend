import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Paintings from "./pages/Paintings";
import Detail from "./pages/Detail";
import User from "./pages/User";
import {UserProvider} from './Context'

export default function App() {
  return (
    <>
      <UserProvider>
      <Router>
        <Route path="/" component={Home} exact />
        <Route path="/paintings" component={Paintings} exact />
        <Route path="/paintings/detail/:name" component={Detail} exact />
        <Route path="/user" component={User} exact />
      </Router>
      </UserProvider>
    </>
  );
}

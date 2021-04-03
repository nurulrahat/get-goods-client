import './App.css';
import Home from './Components/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import LogIn from './Components/LogIn/LogIn';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import { createContext, useState } from 'react';
import Order from './Components/Order/Order';
import Header from './Components/Header/Header';
import Admin from './Components/Admin/Admin';
import CheckOut from './Components/CheckOut/CheckOut';
export const UserContext=createContext() ;
function App() {
  const [loggedInUser,setLoggedInUser]= useState({})
  return (
    <UserContext.Provider value={[loggedInUser,setLoggedInUser]}>
    <Router>
      <div className="App background">
        <Header></Header>
        <Switch>
        <Route exact path="/">
            <Home />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <PrivateRoute path="/order">
            <Order></Order>
          </PrivateRoute>
          <PrivateRoute path="/checkout/:id">
            <CheckOut></CheckOut>
          </PrivateRoute>
          <PrivateRoute path="/admin">
            <Admin></Admin>
          </PrivateRoute>
          <Route path="/login">
            <LogIn></LogIn>
          </Route>
        </Switch>
      </div>
    </Router>
    
    </UserContext.Provider>
  );
}

export default App;

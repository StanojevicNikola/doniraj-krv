import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import "materialize-css/dist/css/materialize.min.css";
import '../css/App.css';

import Test from "./Test";
import HomePage from "./HomePage";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import { Provider } from 'react-redux'
import store from '../store/index'
import NavBar from "./NavBar";
import Footer from "./Footer";
import LoginDash from "./LoginDash";
import RegisterDash from "./RegisterDash";
import UserDash from "./UserDash";
import DonorDash from "./DonorDash";
import CoordinatorDash from "./CoordinatorDash";
import Dashboard from "./Dashboard";
import AdminDash from "./admin/AdminDash";

class App extends Component{

  render() {
    return (
        <Provider store={store}>
            <Router>
                <div>
                    <NavBar/>
                    <div className="container">
                        <Switch>

                            <Route exact path="/">
                                <HomePage />
                            </Route>
                            <Route exact path="/about">
                                <Test />
                            </Route>
                                <Route exact path="/login">
                                <LoginDash/>
                            </Route>
                            <Route exact path="/register">
                                <RegisterDash/>
                            </Route>
                            <Route exact path="/userdash">
                                <UserDash/>
                            </Route>
                            <Route exact path="/donor">
                                <DonorDash/>
                            </Route>
                            <Route exact path="/coordinator">
                                <CoordinatorDash/>
                            </Route>

                            <Route exact path="/dashboard">
                                <Dashboard />
                            </Route>

                            <Route exact path="/admindash">
                                <AdminDash />
                            </Route>

                        </Switch>
                    </div>
                    <Footer/>
                </div>
            </Router>
        </Provider>
    );
  }


}

export default App;

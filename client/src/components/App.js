import React, { Component } from 'react';

import "materialize-css/dist/css/materialize.min.css"
import './App.css';

import Test from "./Test";
import HomePage from "./HomePage";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import { Provider } from 'react-redux'
import store from '../store/index'
import NavBar from "./NavBar";
import Footer from "./Footer";
import LoginDash from "./LoginDash";
import RegisterDash from "./RegisterDash";

class App extends Component{

  render() {
    return (
        <Provider store={store}>
            <Router>
                <div>
                    <NavBar/>

                    <Switch>
                        <div className="container">
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
                        </div>
                    </Switch>
                    <Footer/>
                </div>
            </Router>
        </Provider>
    );
  }


}

export default App;

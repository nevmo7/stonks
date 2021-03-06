import React, { useEffect, useState } from "react";
import {BrowserRouter as Router, Route, Switch, useHistory, Link, Redirect} from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import Dashboard from "./Dashboard";
import NavBar from "./NavBar";
import Landing from "./Landing";
import Wallet from "./Wallet";
import Stock from "./Stock";
import Watchlist from "./Watchlist";
import Ranking from "./Ranking";
import Settings from "./Settings";
import ResetPass from "./ResetPass";
// import { HomePageHeader } from "./HomePageHeader";

function HomePage(props) {

    const[loginStatus, setLoginStatus] = useState(true);
    var csrftoken = getCookie('csrftoken');

    useEffect(()=>{
       
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json", 'X-CSRFToken': csrftoken},
            };
            fetch("/api/is_authenticated", requestOptions).then((response) => {
                if(response.ok){
                    setLoginStatus(true);
                    console.log("You are logged in");
                }else{
                    setLoginStatus(false);
                    console.log("You are not logged in");
                }
            });
    }, []);

    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    return(

        <Router> 
        {loginStatus? <NavBar/> : null}
        <main style={loginStatus ? null: {marginLeft: 0} }>
        <Switch>
            <Route exact path='/'>{loginStatus? <Redirect to="/dashboard"/> : <Landing/>}</Route>
            <Route path='/login'> {loginStatus? <Redirect to="/dashboard"/> : <Login/>} </Route>
            <Route path='/signup'>{loginStatus? <Redirect to="/dashboard"/> : <SignUp/>}</Route>
            <Route path='/dashboard'>{loginStatus ? <Dashboard csrftoken={csrftoken}/> : <Redirect to="/login"/>}</Route>
            <Route path='/ranking'>{loginStatus ? <Ranking csrftoken={csrftoken}/> : <Redirect to="/login"/>}</Route>
            <Route path='/wallet'>{loginStatus ? <Wallet csrftoken={csrftoken}/> : <Redirect to="/login"/>}</Route>
            <Route path='/stock/:symbol'>{loginStatus ? <Stock csrftoken={csrftoken}/> : <Redirect to="/login"/>}</Route>
            <Route path='/watchlist'>{loginStatus ? <Watchlist csrftoken={csrftoken}/> : <Redirect to="/login"/>}</Route>
            <Route path='/settings'>{loginStatus ? <Settings csrftoken={csrftoken}/> : <Redirect to="/login"/>}</Route>
            <Route path='/reset-pass'>{loginStatus ? <Dashboard csrftoken={csrftoken}/> : <ResetPass/>}</Route>
        </Switch>
        
        </main>
        </Router>
        
       
    );
}

export default HomePage;

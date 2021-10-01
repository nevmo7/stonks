import React, { useEffect, useState } from "react";
import {BrowserRouter as Router, Route, Switch, useHistory, Link, Redirect} from "react-router-dom";
import { Grid, Button, Menu, Sidebar, Icon, Search, Header, Divider } from 'semantic-ui-react';
import Login from "./Login";
import SignUp from "./SignUp";
import Profile from "./Profile"
import News from "./News";
import NavBar from "./NavBar";
// import { HomePageHeader } from "./HomePageHeader";

function HomePage(params) {

    const[loginStatus, setLoginStatus] = useState(true);

    useEffect(()=>{
        var csrftoken = getCookie('csrftoken');
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

    function renderHeader(){
        return(<div>
            <Grid centered>
                <Grid.Row>
            
                </Grid.Row>
                <Grid.Row columns="1">
                <Search/>
                </Grid.Row>
            
            </Grid>
    
            <Header.Subheader>Portfolio Value 
                <Header as="h1">$5000
                </Header>
            </Header.Subheader>
            </div>);
    }

    return(

        <Router> 
        {loginStatus? <NavBar/> : null}
        <main style={loginStatus ? null: {marginLeft: 0} }>
        {loginStatus? renderHeader() : null}
        <Switch>
            <Route path='/login'> {loginStatus? <Redirect to="/"/> : <Login/>} </Route>
            <Route exact path='/'>{loginStatus ? <News/> : <Redirect to="/login"/>} </Route>
            <Route path='/signup'>{loginStatus? <Redirect to="/"/> : <SignUp/>}</Route>
            <Route path='/profile' component={Profile}></Route>
        </Switch>
        
        </main>
        </Router>
        
       
    );
}

export default HomePage;

import React, { useEffect, useState } from 'react';
import { Input, Button, Icon, Header, Card, Grid, Message } from 'semantic-ui-react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import SignUp from './SignUp';



function Login (props){
    const[loggedIn, setLoggedIn] = useState();
    const[username, setUsername] = useState();
    const[password, setPassword] = useState();
    const history = useHistory();
    // const[loginStatus, setLoginStatus] = useState();

    var csrftoken = getCookie('csrftoken');

    function loginUser(){
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json",'X-CSRFToken': csrftoken},
            body: JSON.stringify({
                username: username,
                password: password
            }),
        };
        fetch("/api/login", requestOptions).then((response) => response.json())
        .then((data) => {
            if(data.Success){
                console.log("Login success");
                setLoggedIn(true);
                window.location.reload(false);
            }else{
                setLoggedIn(false);
                setLoginError(true);
                
            }
        });
    }

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

    function renderErrorMessage(){
        return(
            <Grid.Row> <Message negative>
            <Message.Header>Could not log in</Message.Header>
            {
                console.log("There was an error")
            }
             <p>Please enter a valid username and password</p>
        </Message></Grid.Row>);
    }

    function handleUsernameChange(e){
        setUsername(e.target.value)
    }

    function handlePassChange(e) {
        setPassword(e.target.value)
    }

    function renderLoginForm(){
        return(<div>
            <Header as='h1' color="orange">
                Stonks
                <Header.Subheader>
                For those diamond hands
                </Header.Subheader>    
            </Header>
        <div className="center-item">
            <Grid centered>
                <Grid.Row columns="1">
                    <Header as='h2' icon textAlign='center'>
                    <Icon name='user' circular />
                    <Header.Content>Login</Header.Content>
                    </Header>
                </Grid.Row>
                { loggedIn == null ? null : renderErrorMessage() }
                <Grid.Row columns="1">
                <Card>
                    <Input style={{margin: 10}} icon='user' iconPosition='left' placeholder='Username' onChange={handleUsernameChange}/>
                    <Input style={{margin: 10}} icon='key' iconPosition='left' placeholder='Password' type="password" onChange={handlePassChange}/>
                    <Button style={{maxWidth:270, margin: 10}} animated='fade' onClick={loginUser}>
                    <Button.Content visible>Login</Button.Content>
                        <Button.Content hidden>
                            <Icon name='arrow right' />
                        </Button.Content>
                    </Button>
                    <Link to="/login"> <p style={{marginBottom: 10}}>Forgot password?</p> </Link>
                    
                </Card>
                </Grid.Row>
                   
                <Link to="/signup"> <p>Dont have an account? Sign Up</p> </Link>
            </Grid>
            
        </div>
        </div>);
    }


    
    return(
        renderLoginForm()
    );
    
}
export default Login;
  


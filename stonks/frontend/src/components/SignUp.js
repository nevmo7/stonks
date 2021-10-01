import React, { useEffect, useState } from 'react';
import { Input, Button, Icon, Header, Card, Grid, Message, GridColumn } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function SignUp (props){
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPass, setConfirmPass] = useState();
    const [userCreated, setUserCreated] = useState();
    const [errorMessages, setErrMsg] = useState();

    

    function signUpUser() {
        var csrftoken = getCookie('csrftoken');
        if(password === confirmPass){
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json",'X-CSRFToken': csrftoken},
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password
                }),
            };
            fetch("/api/signup", requestOptions).then((response) => response.json())
            .then((data) => {
                if(data.Success){
                    setUserCreated(true);
                }else{
                    setUserCreated(false);
                    setErrMsg(data);
                    
                }
            });
        }else{
            
            //handle password dont match
            console.log("Passsword dont match")
        }
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

    function handleUsernameChange(e){
        setUsername(e.target.value)
    }

    function handleEmailChange(e){
        setEmail(e.target.value)
    }

    function handlePassChange(e) {
        setPassword(e.target.value)
    }

    function handleConfirmPassChange(e) {
        setConfirmPass(e.target.value)
    }

    function renderErrorMessage(){
        return(
            <Grid.Row> <Message negative>
            <Message.Header>Could not create an account</Message.Header>
            {
                // errorMessages.forEach(element => {
                //     <p>{element}</p>
                // }) 

                console.log(errorMessages)
            }
        </Message></Grid.Row>);
    }

    function renderSuccessMessage(){
        return (<Grid.Row><Message positive>
            <Message.Header>Successfully created account</Message.Header>
            <p>User successfully created</p>
        </Message></Grid.Row>);
    }

    return(
        <div>
            <Header as='h1' color="orange">
                Stonks
                <Header.Subheader>
                For those diamond hands
                </Header.Subheader>    
            </Header>
        
        <div className="center-item">
            
        <Grid centered maxWidth={8}>
            <Grid.Row>
            <Header as='h2'>
                <Icon name='user'/>
                <Header.Content>Sign Up</Header.Content>
            </Header>
            </Grid.Row>

            { userCreated == null ?  null : userCreated ? renderSuccessMessage() : renderErrorMessage()}

            <Grid.Row>
                <Card>
                    <Input style={{margin: 10}} icon='user' iconPosition='left' placeholder='Username' onChange={handleUsernameChange}/>
                    <Input style={{margin: 10}} icon='at' iconPosition='left' placeholder='Email' onChange={handleEmailChange}/>
                    <Input type="password" style={{margin: 10}} icon='key' iconPosition='left' placeholder='Password' onChange={handlePassChange} />
                    <Input type="password" style={{margin: 10}} icon='key' iconPosition='left' placeholder='Confirm Password' onChange={handleConfirmPassChange}/>
                    <Button style={{maxWidth:270, margin: 10}} animated='fade' onClick={signUpUser}>
                    <Button.Content visible>Sign Up</Button.Content>
                        <Button.Content hidden>
                            <Icon name='arrow right' />
                        </Button.Content>
                    </Button>
                </Card>
            </Grid.Row>
            
            <Link to="/login"> <p>Already have an account? Login</p> </Link>
        </Grid>
            
        </div>
        </div>
    );
}
export default SignUp
  


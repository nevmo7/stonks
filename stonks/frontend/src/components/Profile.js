import React, { useEffect, useState } from "react";
import { Input, Button } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';

export default function HomePage(props) {

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

    function logOut(){
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json"},
            };
            fetch("/api/log_out", requestOptions).then((response) => {
            if(response.ok){
                console.log("You are logged out");
                setLoginStatus(false);
            }else{
                console.log("You are not logged out");
                setLoginStatus(true);
            }
        });
    }

    function renderLogoutButton (){
        return(
            <button onClick={logOut}>Log out</button>
        );
    }
    
    return(
        <p>{loginStatus} {loginStatus ? renderLogoutButton() : <Redirect to="/login"/>} </p>
    );

}

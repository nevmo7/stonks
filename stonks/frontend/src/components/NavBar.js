import React from "react";
import { Link } from "react-router-dom";
import { Input, Button, Menu, Icon } from 'semantic-ui-react';


export default function NavBar(props){

    function logOut(){
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json"},
            };
            fetch("/api/log_out", requestOptions).then((response) => {
            if(response.ok){
                console.log("You are logged out");
                window.location.reload(false);
            }else{
                console.log("You are not logged out");
            }
        });
    }

    return(
        <nav class="navbar">
            <ul class="navbar-nav">
            <li class="logo">
                <a href="#" class="nav-link">
                <span class="link-text logo-text">Stonks</span>
                <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fad"
                    data-icon="angle-double-right"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    class="svg-inline--fa fa-angle-double-right fa-w-14 fa-5x"
                >
                    <g class="fa-group">
                    <path
                        fill="currentColor"
                        d="M224 273L88.37 409a23.78 23.78 0 0 1-33.8 0L32 386.36a23.94 23.94 0 0 1 0-33.89l96.13-96.37L32 159.73a23.94 23.94 0 0 1 0-33.89l22.44-22.79a23.78 23.78 0 0 1 33.8 0L223.88 239a23.94 23.94 0 0 1 .1 34z"
                        class="fa-primary"
                    ></path>
                    <path
                        fill="currentColor"
                        d="M415.89 273L280.34 409a23.77 23.77 0 0 1-33.79 0L224 386.26a23.94 23.94 0 0 1 0-33.89L320.11 256l-96-96.47a23.94 23.94 0 0 1 0-33.89l22.52-22.59a23.77 23.77 0 0 1 33.79 0L416 239a24 24 0 0 1-.11 34z"
                        class="fa-primary"
                    ></path>
                    </g>
                </svg>
                </a>
            </li>
            
            <li class="nav-item">
                <Link to="/" className="nav-link">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="house" class="svg-inline--fa fa-house" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                    <path class="fa-primary" fill="currentColor" d="M575.8 255.5C575.8 273.5 560.8 287.6 543.8 287.6H511.8L512.5 447.7C512.5 450.5 512.3 453.1 512 455.8V472C512 494.1 494.1 512 472 512H456C454.9 512 453.8 511.1 452.7 511.9C451.3 511.1 449.9 512 448.5 512H392C369.9 512 352 494.1 352 472V384C352 366.3 337.7 352 320 352H256C238.3 352 224 366.3 224 384V472C224 494.1 206.1 512 184 512H128.1C126.6 512 125.1 511.9 123.6 511.8C122.4 511.9 121.2 512 120 512H104C81.91 512 64 494.1 64 472V360C64 359.1 64.03 358.1 64.09 357.2V287.6H32.05C14.02 287.6 0 273.5 0 255.5C0 246.5 3.004 238.5 10.01 231.5L266.4 8.016C273.4 1.002 281.4 0 288.4 0C295.4 0 303.4 2.004 309.5 7.014L564.8 231.5C572.8 238.5 576.9 246.5 575.8 255.5L575.8 255.5z"></path></svg>
                    <span class="link-text">Home</span>
                </Link>
            </li>
            
            <li class="nav-item">
                <Link to="/" className="nav-link">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="gear" class="svg-inline--fa fa-gear" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path class="fa-primary" fill="currentColor" d="M499.5 332c0-5.66-3.112-11.13-8.203-14.07l-46.61-26.91C446.8 279.6 448 267.1 448 256s-1.242-23.65-3.34-35.02l46.61-26.91c5.092-2.941 8.203-8.411 8.203-14.07c0-14.1-41.98-99.04-63.86-99.04c-2.832 0-5.688 .7266-8.246 2.203l-46.72 26.98C362.9 94.98 342.4 83.1 320 75.16V21.28c0-7.523-5.162-14.28-12.53-15.82C290.8 1.977 273.7 0 256 0s-34.85 1.977-51.48 5.461C197.2 7.004 192 13.76 192 21.28v53.88C169.6 83.1 149.1 94.98 131.4 110.1L84.63 83.16C82.08 81.68 79.22 80.95 76.39 80.95c-19.72 0-63.86 81.95-63.86 99.04c0 5.66 3.112 11.13 8.203 14.07l46.61 26.91C65.24 232.4 64 244 64 256s1.242 23.65 3.34 35.02l-46.61 26.91c-5.092 2.941-8.203 8.411-8.203 14.07c0 14.1 41.98 99.04 63.86 99.04c2.832 0 5.688-.7266 8.246-2.203l46.72-26.98C149.1 417 169.6 428.9 192 436.8v53.88c0 7.523 5.162 14.28 12.53 15.82C221.2 510 238.3 512 255.1 512s34.85-1.977 51.48-5.461C314.8 504.1 320 498.2 320 490.7v-53.88c22.42-7.938 42.93-19.82 60.65-34.97l46.72 26.98c2.557 1.477 5.416 2.203 8.246 2.203C455.3 431 499.5 349.1 499.5 332zM256 336c-44.11 0-80-35.89-80-80S211.9 176 256 176s80 35.89 80 80S300.1 336 256 336z">
                    </path></svg>
                <span class="link-text">Settings</span>
                </Link>
            </li>

            <li class="nav-item">
                <Link to="/" className="nav-link">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="eye" class="svg-inline--fa fa-eye" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                    <path class="fa-primary" fill="currentColor" d="M572.5 238.1C518.3 115.5 410.9 32 288 32S57.69 115.6 3.469 238.1C1.563 243.4 0 251 0 256c0 4.977 1.562 12.6 3.469 17.03C57.72 396.5 165.1 480 288 480s230.3-83.58 284.5-206.1C574.4 268.6 576 260.1 576 256C576 251 574.4 243.4 572.5 238.1zM432 256c0 79.45-64.47 144-143.9 144C208.6 400 144 335.5 144 256S208.5 112 288 112S432 176.5 432 256zM288 160C285.7 160 282.4 160.4 279.5 160.8C284.8 170 288 180.6 288 192c0 35.35-28.65 64-64 64C212.6 256 201.1 252.7 192.7 247.5C192.4 250.5 192 253.6 192 256c0 52.1 43 96 96 96s96-42.99 96-95.99S340.1 160 288 160z"></path></svg>
                <span class="link-text">Watchlists</span>
                </Link>
            </li>

            <li class="nav-item">
                <Link to="/" className="nav-link">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="money-check-dollar" class="svg-inline--fa fa-money-check-dollar" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                    <path class="fa-primary" fill="currentColor" d="M528 64h-480C21.6 64 0 85.6 0 112v288C0 426.4 21.6 448 48 448h480c26.4 0 48-21.6 48-48v-288C576 85.6 554.4 64 528 64zM205.6 298.1c-3.604 20.82-19.34 34.52-41.58 39.33V348c0 11.05-8.988 20-20.03 20s-19.97-8.953-19.97-20v-11.06c-8.707-1.934-17.37-4.752-25.16-7.568l-4.031-1.453C84.44 324.2 79 312.8 82.7 302.4S97.89 286.6 108.2 290.2l4.234 1.516c7.844 2.828 16.73 6.047 23.67 7.078c13.62 2.125 28.73 .2187 30.08-7.547c.8594-5 1.344-7.75-27.75-16.08L132.7 273.5C115.4 268.5 74.98 256.6 82.38 213.9c3.615-20.9 19.3-34.82 41.67-39.58V164c0-11.05 8.918-20 19.97-20s20.03 8.953 20.03 20v10.95C169.5 176.2 175.3 177.7 182.4 180.2c10.44 3.609 15.97 15 12.34 25.44c-3.609 10.42-15 15.98-25.44 12.34C163.5 215.1 157.3 214 151.7 213.2C138.2 211 123.1 212.1 121.8 220.7C121 225.1 120.5 228.3 144 235.2l5.469 1.578C171.7 243.1 213.1 254.9 205.6 298.1zM336 320l-64-.0005c-8.801 0-16-7.201-16-15.1c0-8.801 7.199-16 16-16L336 288C344.8 288 352 295.2 352 304C352 312.8 344.8 320 336 320zM496 319.1L432 320C423.2 320 416 312.8 416 304C416 295.2 423.2 288 432 288l64-.0005c8.801 0 16 7.199 16 16C512 312.8 504.8 319.1 496 319.1zM496 224h-224C263.2 224 256 216.8 256 208C256 199.2 263.2 192 272 192h224C504.8 192 512 199.2 512 208C512 216.8 504.8 224 496 224z">
                    </path></svg>
                <span class="link-text">Orders</span>
                </Link>
            </li>

            <li class="nav-item">
                <Link to="/" className="nav-link">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="wallet" class="svg-inline--fa fa-wallet" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path class="fa-primary" fill="currentColor" d="M448 128H80C71.13 128 64 120.9 64 112S71.13 96 80 96H480V80C480 53.49 458.5 32 432 32H64C28.65 32 0 60.65 0 96v320c0 35.34 28.65 64 64 64h384c35.35 0 64-28.66 64-64V192C512 156.7 483.3 128 448 128zM416 336c-17.62 0-32-14.38-32-32s14.38-32 32-32s32 14.38 32 32S433.6 336 416 336z">
                    </path></svg>
                <span class="link-text">Wallet</span>
                </Link>
            </li>

            <li class="nav-item" id="themeButton">
                <Link class="nav-link" onClick={logOut}>
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="right-from-bracket" class="svg-inline--fa fa-right-from-bracket" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path class="fa-primary" fill="currentColor" d="M96 480h64C177.7 480 192 465.7 192 448S177.7 416 160 416H96c-17.67 0-32-14.33-32-32V128c0-17.67 14.33-32 32-32h64C177.7 96 192 81.67 192 64S177.7 32 160 32H96C42.98 32 0 74.98 0 128v256C0 437 42.98 480 96 480zM504.8 238.5l-144.1-136c-6.975-6.578-17.2-8.375-26-4.594c-8.803 3.797-14.51 12.47-14.51 22.05l-.0918 72l-128-.001c-17.69 0-32.02 14.33-32.02 32v64c0 17.67 14.34 32 32.02 32l128 .001l.0918 71.1c0 9.578 5.707 18.25 14.51 22.05c8.803 3.781 19.03 1.984 26-4.594l144.1-136C514.4 264.4 514.4 247.6 504.8 238.5z"></path></svg>
                <span class="link-text"> Logout</span>
                </Link>
            </li>
            </ul>
        </nav>
    );
}
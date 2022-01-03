import React, {useEffect, useState} from "react";
import {Grid, Header, Container, Tab, Input, Icon, Button, Label, Message, List, ListDescription} from "semantic-ui-react"

function Settings(props){
    var csrftoken = props.csrftoken
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()

    const [newEmail, setNewEmail] = useState()
    const[password, setPassword] = useState()
    const[newPassword, setNewPassword] = useState()
    const[newPasswordAgain, setNewPasswordAgain] = useState()

    const[message, setMessage] = useState()
    const[msgType, setMsgType] = useState()

    const[tradingHistory, setTradingHistory] = useState([])

    const[secMsgType, setSecMsgType] = useState()

    useEffect(() => {
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json", 'X-CSRFToken': csrftoken},
        };
        fetch("/api/email_and_username", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setUsername(data.username)
                setEmail(data.email)

                getTradinghistory()
            });
    }, [])

    const getTradinghistory = () =>{

        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json", 'X-CSRFToken': csrftoken},
        };
        fetch("/api/get_trading_history", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.Success) {
                    setTradingHistory(data.Success)
                }
        });
        
    }

    const changeEmail = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json", 'X-CSRFToken': csrftoken},
            body: JSON.stringify({
                newEmail: newEmail,
                password: password
            }),
        };
        
        if (newEmail && password && validateEmail(newEmail)) {
            fetch("/api/change_email", requestOptions)
                .then((response) => response.json())
                .then((data) => {
                   if(data.Success){
                        setMsgType("Success")
                        setMessage(data.Success)
                   }else{
                        setMsgType("Error")
                        setMessage(data.Error)
                   }
            });
        }else{
            setMsgType("Error")
            setMessage("Please enter a valid email")
        }
        
    }

    const changePass = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json", 'X-CSRFToken': csrftoken},
            body: JSON.stringify({
                password: password,
                newPassword: newPassword
            }),
        };
        
        if (password && newPassword) {
            if(newPassword === newPasswordAgain){
                fetch("/api/change_pass", requestOptions)
                    .then((response) => response.json())
                    .then((data) => {
                    if(data.Success){
                            setSecMsgType("Success")
                            setMessage(data.Success)
                    }else{
                            setSecMsgType("Error")
                            setMessage(data.Error)
                    }
                });
            }else{
                setSecMsgType("Error")
                setMessage("Passwords do not match")
            }
        }else{
            setSecMsgType("Error")
            setMessage("Please enter password")
        }
    }

    const validateEmail = (email) => {
        return email.match(
                /\S+@\S+\.\S+/)
    }

    const panes = [
        { menuItem: 'General', render: () => <Tab.Pane>{renderGeneralChange()}</Tab.Pane> },
        { menuItem: 'Security', render: () => <Tab.Pane>{renderSecurityChange()}</Tab.Pane> },
        { menuItem: 'Trading history', render: () => <Tab.Pane>{renderTradingHistory()}</Tab.Pane> },
    ]

    const renderMsg = () => {
        return(
            <Grid.Row>
                <Message positive={msgType === "Success" ? true : false} negative={msgType === "Error" ? true : false}>
                    <Message.Header>{msgType}</Message.Header>
                    <p>{message}</p>
                </Message>
            </Grid.Row>
        )
    }

    const renderSecMsg = () => {
        return(
            <Grid.Row>
                <Message positive={secMsgType === "Success" ? true : false} negative={secMsgType === "Error" ? true : false}>
                    <Message.Header>{secMsgType}</Message.Header>
                    <p>{message}</p>
                </Message>
            </Grid.Row>
        )
    }

    const renderTradingHistory = () =>{
        return(
            <List divided verticalAlign="middle">
                {renderTable()}
            </List>
        )
    }

    const renderTable = () =>{
        const tradeList = [];

        Array.from(tradingHistory).forEach((trade) => {
            tradeList.push(
                <List.Item>
                    <List.Content floated='right'>
                        <List.Description>
                            {trade.transaction === "Buy"? "-" : "+"}${trade.value}
                        </List.Description>
                    </List.Content>

                    <List.Icon>
                        <Label color={trade.transaction === "Buy"? "green": "red"}>{trade.transaction}</Label>
                    </List.Icon>
                   
                    <List.Content>
                        <List.Header>{trade.ticker}</List.Header>
                        <List.Description>{trade.name}</List.Description>
                        <List.Description>{trade.date}</List.Description>
                    </List.Content>
                </List.Item>
                )
        });

        return tradeList;
    }

    const renderGeneralChange = () => {
        return(
            <Grid centered>
                <Grid.Row>
                    <Label>
                        <Icon name='mail' /> {email}
                    </Label>  
                    <Label>
                        <Icon name='user' /> {username}
                    </Label>  
                </Grid.Row>
                {msgType? renderMsg() : null}
                <Grid.Row>
                    <Input iconPosition='left' placeholder='New Email'>
                        <Icon name='at' />
                        <input type="email" onChange={(e) =>  {
                            setNewEmail(e.target.value)
                            }}/>
                    </Input>
                </Grid.Row>
                <Grid.Row>
                    <Input iconPosition='left' placeholder='Enter Password'>
                        <Icon name='key' />
                        <input type="password" onChange={(e) => setPassword(e.target.value)}/>
                    </Input>
                </Grid.Row>
                <Grid.Row>
                    <Button onClick={() => changeEmail()}>
                        Save changes
                    </Button>
                </Grid.Row>
            </Grid>
        )
    }

    const renderSecurityChange = () => {
        return(
            <Grid centered>
                {secMsgType? renderSecMsg() : null}
                <Grid.Row>
                    <Input placeholder='Current Password'>
                        <input type="password" onChange={(e) => setPassword(e.target.value)}/>
                    </Input>
                </Grid.Row>
                <Grid.Row>
                    <Input placeholder='New Password'>
                        <input type="password" onChange={(e) => {
                                setNewPassword(e.target.value)
                            }}/>
                    </Input>
                </Grid.Row>
                <Grid.Row>
                    <Input placeholder='Confirm Password'>
                        <input type="password" onChange={(e) => {
                            setNewPasswordAgain(e.target.value)
                        }}/> 
                        
                    </Input>
                </Grid.Row>
                <Grid.Row>
                    <Button  onClick={() => changePass()}>
                        Change password
                    </Button>
                </Grid.Row>
            </Grid>
        )
    }

    return(
        <Grid textAlign="center" padded>
        <Grid.Row>
            <Header as='h1' icon>
                Settings
                <Header.Subheader>
                Manage your account
                </Header.Subheader>
            </Header>
        </Grid.Row>
        
        <Grid.Row>
            <Container>
                <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
            </Container>
        </Grid.Row>

    </Grid>
    )
}

export default Settings;
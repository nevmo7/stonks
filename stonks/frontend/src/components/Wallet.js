import React, { useEffect, useState } from "react";
import { Input, Button, Grid, Header, Segment, Label, Statistic, Message} from 'semantic-ui-react';

function Wallet(props){
    const[showDepositComp, setShowDepositComp] = useState(false);
    const[showWithdrawComp, setShowWithdrawComp] = useState(false);
    const[depositAmount, setDepositAmount] = useState();
    const[withdrawAmount, setWithdrawAmount] = useState();
    const[availableFunds, setAvailableFunds] = useState(0);
    const[successful, setSuccessful] = useState(false);

    var csrftoken = getCookie('csrftoken');

    useEffect(() => {
        getBuyingPower()
    }, [])

    function sendDeposit(){
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json",'X-CSRFToken': csrftoken},
            body: JSON.stringify({
                amount: depositAmount,
            }),
        };
        fetch("/api/add_funds", requestOptions).then((response) => response.json())
        .then((data) => {
            if(data.Success){
                console.log("Deposit successful!");
                getBuyingPower();
                setSuccessful(true);
            }
        });
    }

    function getBuyingPower(){
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json",'X-CSRFToken': csrftoken},
        };
        fetch("/api/get_funds", requestOptions).then((response) => response.json())
        .then((data) => {
            if(data.Success){
                console.log(data.Success);
                setAvailableFunds(data.Success);
            }
        });
    }

    function sendWithdraw(){
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json",'X-CSRFToken': csrftoken},
            body: JSON.stringify({
                amount: withdrawAmount,
            }),
        };
        fetch("/api/withdraw_funds", requestOptions).then((response) => response.json())
        .then((data) => {
            if(data.Success){
                console.log("Withdrawl successful!");
                getBuyingPower();
                setSuccessful(true);
            }
        });
    }

    function showSuccessMessage(){
        return(
            <Grid.Row>
                <Message positive>
                    <Message.Header>Success</Message.Header>
                    <p>
                    Your operation was successful
                    </p>
                </Message>
            </Grid.Row>
        );
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

    function showWithdraw(){
        return(
            <Segment padded>
                <Grid>
                    <Grid.Row centered>
                        <Header as="h3">
                            Withdraw
                        </Header>
                    </Grid.Row>
                    <Grid.Row>
                        <Button basic onClick={() => { setShowWithdrawComp(false) }}> Back </Button>
                    </Grid.Row>
                    <Grid.Row centered>
                    <Input label='$' onChange={(e) => { setWithdrawAmount(e.target.value) }} size="large" labelPosition='left' type='text' placeholder='Withdraw Amount'/>
                    </Grid.Row>
                    <Grid.Row centered>
                        <Button color="orange" onClick={sendWithdraw}>Withdraw</Button>
                    </Grid.Row>
                </Grid>
                
            </Segment>
            
        );
    }

    function showDeposit(){
        return(
            <Segment padded>
                <Grid>
                    <Grid.Row centered>
                        <Header as="h3">
                            Deposit
                        </Header>
                    </Grid.Row>
                    <Grid.Row columns={2}>
                        <Button basic onClick={() => { setShowDepositComp(false) }}> Back </Button>
                    </Grid.Row>
                    <Grid.Row centered>
                    <Input label='$' onChange={(e) => { setDepositAmount(e.target.value) }} size="large" labelPosition='left' type='text' placeholder='Deposit Amount'/>
                        
                    </Grid.Row>
                    <Grid.Row centered>
                        <Button color="orange" onClick={sendDeposit}>Deposit</Button>
                    </Grid.Row>
                </Grid>
                
            </Segment>
            
        )
    }
    
    function showButton(){
        return(
            <Button.Group>
                <Button size="massive" onClick={() => { setShowDepositComp(true) }}>Deposit</Button>
                <Button size="massive" onClick={() => { setShowWithdrawComp(true) }}>Withdraw</Button>
            </Button.Group>
        );
    }

    return(<div >
        <Grid textAlign="center" padded>
            <Grid.Row>

            <Header as='h1' icon>
                Wallet
                <Header.Subheader>
                Add and withdraw funds
                </Header.Subheader>
            </Header>
            </Grid.Row>
            
            <Grid.Row>
                <Segment padded>

                <Statistic size="tiny">
                    <Statistic.Value> ${availableFunds}</Statistic.Value>
                    <Statistic.Label>Available funds</Statistic.Label>
                </Statistic>
                
                </Segment>
            </Grid.Row>
            {successful? showSuccessMessage() : null}
            <Grid.Row >
                {showDepositComp? showDeposit() : showWithdrawComp ? showWithdraw() : showButton()}
            </Grid.Row>

        </Grid>
    </div>
        

    );
}

export default Wallet;
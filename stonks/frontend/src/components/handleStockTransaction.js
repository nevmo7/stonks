import React, {useState, useEffect} from "react";
import { Modal, Button } from "semantic-ui-react";

export function buyStock(symbol, price, unit, name) {
    var csrftoken = getCookie('csrftoken');
    var message = "";

    console.log(JSON.stringify({
        ticker: symbol,
        buy_price: price,
        company_name: name,
        units: unit
    }));
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-CSRFToken": csrftoken},
        body: JSON.stringify({
            ticker: symbol,
            buy_price: price,
            units: unit,
            company_name: name
        }),
    };
    fetch("/api/buy_stock", requestOptions).then((response) => response.json())
        .then((data) => {
            if(data.Success){
                message = data.Success
            }else{
                message = data.Error
            }
        })
}

export function renderSellConfirm(sellUnits, sellPrice, sellSymbol, name){
    const [open, setOpen] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);
    const error = sellUnits < 1 || !sellUnits;
    return(<div style={{width: "100%"}}>
        <Modal
            basic
            size='tiny'
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button fluid>Sell</Button>}
        >
            <Modal.Header>{error?"Error":"Confirm sell"}</Modal.Header>
            <Modal.Content>
                {error? 
                <p>Please Enter a valid number</p>:
                <p>Are you sure you want to sell {sellUnits} {sellSymbol} @{sellPrice}?</p>}
            </Modal.Content>
            <Modal.Actions>
            <Button negative onClick={() => setOpen(false)}>
                {error?"Ok":"No"}
            </Button>
            {error? null:
            <Button positive onClick={() => {
                setOpen(false);
                setSuccessOpen(true);
                sellStock(sellSymbol, sellPrice, sellUnits, name);
                }}>
                Yes
            </Button>}
            </Modal.Actions>
        </Modal>

        <Modal
            basic
            size='tiny'
            onClose={() => setSuccessOpen(false)}
            onOpen={() => setSuccessOpen(true)}
            open={successOpen}
        >
            <Modal.Header>Confirm sell</Modal.Header>
            <Modal.Content>
                <p>Success! sold {sellUnits} of {sellSymbol} @{sellPrice}</p>
            </Modal.Content>
            <Modal.Actions>
            <Button positive onClick={() => setSuccessOpen(false)}>
                Ok
            </Button>
            </Modal.Actions>
        </Modal>
     </div>
    );
}

export function renderBuyConfirm(buyUnits, buyPrice, buySymbol, name){
    const [open, setOpen] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);
    const error = buyUnits < 1 || !buyUnits;
    return(
        <div style={{width: "100%"}}>
            <Modal
                basic
                size='tiny'
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={<Button fluid>Buy</Button>}
            >
                <Modal.Header>{error?"Error":"Confirm buy"}</Modal.Header>

                <Modal.Content>
                    {error?
                    <p>Please Enter a valid number</p>:
                    <p>Are you sure you want to buy {buyUnits} {buySymbol} @{buyPrice}?</p>}
                </Modal.Content>
                <Modal.Actions>
                <Button negative onClick={() => setOpen(false)}>
                    {error?"Ok":"No"}
                </Button>
                {error?null:
                <Button positive onClick={() => {
                        setOpen(false);
                        setSuccessOpen(true)
                        buyStock(buySymbol, buyPrice, buyUnits, name);
                    }}>
                    Yes
                </Button>}
                </Modal.Actions>
            </Modal>

            <Modal
                basic
                size='tiny'
                onClose={() => setSuccessOpen(false)}
                onOpen={() => setSuccessOpen(true)}
                open={successOpen}
                >
                <Modal.Header>Confirm buy</Modal.Header>
                <Modal.Content>
                    <p>Success! bought {buyUnits} of {buySymbol} @{buyPrice}</p>
                </Modal.Content>
                <Modal.Actions>
                <Button positive onClick={() => setSuccessOpen(false)}>
                    Ok
                </Button>
                </Modal.Actions>
            </Modal>
        </div>
    );
}

export function sellStock(symbol, price, unit, name) {
    var csrftoken = getCookie('csrftoken');
    var message = "";
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-CSRFToken": csrftoken},
        body: JSON.stringify({
            ticker: symbol,
            sell_price: price,
            units: unit,
            company_name: name
        }),
    };
    fetch("/api/sell_stock", requestOptions).then((response) => response.json())
        .then((data) => {
            if(data.Success){
                message = data.Success
            }else{
                message = data.Error
            }
        })
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
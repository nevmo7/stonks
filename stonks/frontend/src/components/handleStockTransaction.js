export function buyStock(symbol, price, unit) {
    var csrftoken = getCookie('csrftoken');
    var message = "";

    console.log(JSON.stringify({
        ticker: symbol,
        buy_price: price,
        units: unit
    }));
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-CSRFToken": csrftoken},
        body: JSON.stringify({
            ticker: symbol,
            buy_price: price,
            units: unit
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

export function renderConfirm(){
    return(
        <Modal
            size={size}
            open={open}
            onClose={() => dispatch({ type: 'close' })}
        >
            <Modal.Header>Delete Your Account</Modal.Header>
            <Modal.Content>
                <p>Are you sure you want to delete your account</p>
            </Modal.Content>
            <Modal.Actions>
            <Button negative onClick={() => dispatch({ type: 'close' })}>
                No
            </Button>
            <Button positive onClick={() => dispatch({ type: 'close' })}>
                Yes
            </Button>
            </Modal.Actions>
        </Modal>
    );
}

export function sellStock(symbol, price, unit) {
    var csrftoken = getCookie('csrftoken');
    var message = "";
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-CSRFToken": csrftoken},
        body: JSON.stringify({
            ticker: symbol,
            sell_price: price,
            units: unit
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
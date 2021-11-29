import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {Container, Grid, Header, Icon, Table} from 'semantic-ui-react';

function Watchlist(props){

    const[watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json"},
        };
        fetch("/api/get_watchlist", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setWatchlist(data);
            });
    }, []);

    function removeFromWatchlist(symbol){
        var csrftoken = getCookie('csrftoken');
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json", "X-CSRFToken": csrftoken},
            body: JSON.stringify({
                symbol: symbol,
            }),
        };
        fetch("/api/remove_from_watchlist", requestOptions).then((response) => response.json())
            .then((data) => {
                if(data.Success){

                    const newWatchlist = watchlist.filter((stock) => {
                        return stock.ticker !== symbol
                    })
                    setWatchlist(newWatchlist);
                    console.log(watchlist);
                }
            })
    }

    function getCookie(name) {
        console.log("Getting csrf token");
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

    function renderWatchlist(){
        const stockList = [];
        Array.from(watchlist).forEach((stock) => {
            var negativeChange;
            if(stock.change.charAt(0) === "-"){
                negativeChange = true
            }else{
                negativeChange = false
            }
            stockList.push(
                <Table.Row >
                    <Table.Cell><Link to={"/stock/" + stock.ticker}>{stock.ticker}</Link></Table.Cell>
                    <Table.Cell>{stock.name}</Table.Cell>
                    <Table.Cell textAlign="right"><span style={{color: negativeChange? "red": "green"}}>{stock.change}</span></Table.Cell>
                    <Table.Cell textAlign="right"><span style={{color: negativeChange? "red": "green"}}>{stock.changePercent}%</span></Table.Cell>
                    <Table.Cell textAlign="right">{stock.price}</Table.Cell>
                    <Table.Cell><a href='javascript:void(0)' onClick={() => removeFromWatchlist(stock.ticker)}><Icon name="close"/></a></Table.Cell>
                </Table.Row>)
       });
       
       return stockList;
    }

    return(
        <Container>
            <Grid>
                <Grid.Row centered>
                <Header as='h1' icon>
                    Watchlist
                    <Header.Subheader>
                    Stocks you are interested in
                    </Header.Subheader>
                </Header>
                </Grid.Row>
            </Grid>
            <Table basic='very' selectable>
               
                <Table.Body>
                    {renderWatchlist()}
                </Table.Body>

            </Table>
        </Container>
    );
}

export default Watchlist

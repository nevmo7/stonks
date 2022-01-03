import React, {useState, useEffect} from 'react';
import { Line } from 'react-chartjs-2';
import { useParams } from 'react-router';
import {Grid, Header, Tab, Segment, ButtonGroup, Button, Input, Message, Image, Icon, Label} from 'semantic-ui-react';
import SearchStock from './StockSearch';
import { buyStock, sellStock, renderBuyConfirm, renderSellConfirm, renderErrorMsg } from './handleStockTransaction';

function Stock(props){
    useEffect(()=>{
        getChartData();
        getStockProfile();
        checkWatchlist();
    }, [])

    const[panes, setPanes] = useState([])
    let {symbol} = useParams();
    const[buyShare, setBuyShare] = useState(true);

    const[displaySymbol, setDisplaySymbol] = useState();
    const[totalBuyValue, setTotalBuyValue] = useState(0);
    const[totalSellValue, setTotalSellValue] = useState(0);

    const[name, setName] = useState();
    const[high52, setHigh52] = useState();
    const[low52, setLow52] = useState();
    const[high, setHigh] = useState();
    const[low, setLow] = useState();
    const[open, setOpen] = useState();
    const[close, setClose] = useState();
    const[volume, setVolume] = useState();
    const[logoUrl, setLogoUrl] = useState();
    const[change, setChange] = useState();
    const[percentChange, setPercentChange] = useState();
    const[negativeChange, setNegativeChange] = useState();

    const [inWatchlist, setInWatchlist] = useState(false);

    const[buyUnits, setBuyUnits] = useState();
    const[sellUnits, setSellUnits] = useState();

    function getStockProfile(){
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json"},
        };

        fetch("/stock-api/get-profile/" + symbol, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setName(data.name);
                setHigh52(data.fifty_two_week.high);
                setLow52(data.fifty_two_week.low);
                setHigh(data.high);
                setLow(data.low);
                setOpen(data.open);
                setClose(data.close);
                setLogoUrl(data.logo_url);
                setVolume(data.volume);
                setDisplaySymbol(data.symbol);
                setChange(data.change);
                setPercentChange(data.percent_change);
                if(data.change.charAt(0) === "-"){
                    setNegativeChange(true);
                }else{
                    setNegativeChange(false)
                }

            })
    }   

    function getChartData(){
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json"},
        };

        fetch("/stock-api/get-chart/" + symbol, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if(data.Month){
                    
                    let monthChartData, monthChartLabels;
                    monthChartLabels = Object.keys(data.Month).reverse()
                    monthChartData = Object.values(data.Month).reverse()

                    let dayChartLabel = Object.keys(data.Day).reverse()
                    let dayChartData = Object.values(data.Day).reverse()

                    let weekChartLabel = Object.keys(data.Week).reverse()
                    let weekChartData = Object.values(data.Week).reverse()

                    setPanes([
                        {
                          menuItem: 'Day',
                          render: () => <Tab.Pane attached={false}>
                              <Line data={
                                  {
                                    labels: dayChartLabel,
                                    datasets: [
                                        {
                                            data: dayChartData,
                                            fill: true,
                                            backgroundColor: "rgba(75,150,192,0.2)",
                                            borderColor: 'rgb(75,150,192)',
                                            tension: 0.4
                                        }
                                    ]
                                }
                              } 
                              
                              options= {{
                                        responsive: true,
                                        plugins:{
                                            legend: {
                                                display: false
                                            }
                                        }
                                }}/>
                                </Tab.Pane>,
                        },
                        {
                          menuItem: 'Week',
                          render: () => 
                          <Tab.Pane attached={false}>
                              <Line data={
                                  {
                        
                                    labels: weekChartLabel,
                                    datasets: [
                                        {
                                            label: "First dataset",
                                            data: weekChartData,
                                            fill: true,
                                            backgroundColor: "rgba(75,100,100,0.2)",
                                            borderColor: 'rgb(75,100,100)',
                                            tension: 0.3
                                        }
                                    ]
                                }
                              } 
                              
                              options= {{
                                        responsive: true,
                                        plugins:{
                                            legend: {
                                                display: false
                                            }
                                        }
                                    }}/>
                                </Tab.Pane>,
                        },
                        {
                          menuItem: 'Month',
                          render: () => <Tab.Pane attached={false}>
                              <Line data={
                                {
                                    labels: monthChartLabels,
                                    datasets: [
                                        {
                                            label: "First dataset",
                                            data: monthChartData,
                                            fill: true,
                                            backgroundColor: "rgba(75,193,193,0.2)",
                                            borderColor: 'rgb(75,193,193)',
                                            tension: 0.3
                                        }
                                    ]
                                }
                              } 
                              
                              options= {{
                                    responsive: true,
                                    plugins:{
                                        legend: {
                                            display: false
                                        }
                                    }
                                }}/>
                            </Tab.Pane>,
                        },
                    ])
                    
                }else{
                    console.log("There was an error")
                }
            });
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

    function checkWatchlist(){
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json"},
        };
        fetch("/api/check_watchlist/" + symbol.toUpperCase(), requestOptions).then((response) => response.json())
            .then((data) => setInWatchlist(data.Success))
    }

    function handleWatchlistBtnClick(){
        if(inWatchlist){
            removeFromWatchlist();
        }else{
            addToWatchlist();
        }
    }

    function removeFromWatchlist(){
        var csrftoken = getCookie('csrftoken');
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json", "X-CSRFToken": csrftoken},
            body: JSON.stringify({
                symbol: displaySymbol,
            }),
        };
        fetch("/api/remove_from_watchlist", requestOptions).then((response) => response.json())
            .then((data) => {
                if(data.Success){
                    setInWatchlist(false)
                }else{
                    setInWatchlist(true)
                }
            })
    }

    function addToWatchlist(){
        var csrftoken = getCookie('csrftoken');
        
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json", 'X-CSRFToken': csrftoken},
            body: JSON.stringify({
                symbol: displaySymbol,
            }),
        };
        fetch("/api/add_to_watchlist", requestOptions).then((response) => response.json())
            .then((data) => {
                if(data.Success){
                    setInWatchlist(true)
                }else{
                    setInWatchlist(false)
                }
            })
    }
      
    function handleBuySection(){
        return(
            <Grid padded>
                <Grid.Row centered>
                    <Message fluid>
                    <Message.Header>Notice</Message.Header>
                        <p>
                        We only execute market orders
                        </p>
                    </Message>
                </Grid.Row>
                <Grid.Row centered>
                    <Input placeholder="Enter buy amount" onChange={(e) => { 
                            const unitsBought = parseInt(e.target.value, 0);
                            setBuyUnits(unitsBought); 
                            setTotalBuyValue((unitsBought * close).toFixed(2));
                        }}/> 
                        <Label color="green">Total Value: {totalBuyValue}</Label>
                </Grid.Row>
                <Grid.Row>
                   {renderBuyConfirm(buyUnits, close, displaySymbol, name)}
                </Grid.Row>
            </Grid>
            

        );
    }

    function handleSellSection(){
        return(
            <Grid padded>
                <Grid.Row centered>
                    <Input placeholder="Enter sell amount" onChange={(e) => { 
                            const unitsSold = parseInt(e.target.value, 0);
                            setSellUnits(unitsSold);
                            setTotalSellValue((unitsSold * close).toFixed(2));
                        }}/>
                        <Label color="red">Total Value: {totalSellValue}</Label>
                </Grid.Row>
                <Grid.Row>
                    {renderSellConfirm(sellUnits, close, displaySymbol, name)}
                </Grid.Row>
            </Grid>
        );
    }

    return(
        <Grid>
            <Grid.Row centered>
                <SearchStock/>
            </Grid.Row>

            <Grid.Row >
                <Grid.Column mobile={16} tablet={16} computer={10}>
                    <Grid columns={2}>

                        <Grid.Column width={12} verticalAlign="middle">
                            <Header as="h1">
                                {name}
                                <Header.Subheader>
                                    {displaySymbol}
                                </Header.Subheader>
                                <Header.Content>
                                    {close} <span style={{fontSize: 15, color: negativeChange? "red": "green"}}>{change} ({percentChange}%)</span>
                                </Header.Content>
                            </Header>
                        </Grid.Column>

                        <Grid.Column width={4} verticalAlign="middle">
                            <Image floated="right" src={logoUrl} style={{height: 80}} />
                        </Grid.Column>
                    </Grid>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column mobile={16} tablet={16} computer={10}>
                    <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
                </Grid.Column>
                <Grid.Column mobile={16} tablet={16} computer={6}>
                    <Button fluid inverted color="orange" onClick={() => handleWatchlistBtnClick()}>
                        {inWatchlist? <Icon name="check circle"/> : <Icon name="add circle"/> }
                        Watchlist
                    </Button>
                    <Segment>
                        <ButtonGroup fluid>
                            <Button basic color='green' onClick={()=> setBuyShare(true)}>Buy</Button>
                            <Button basic color='red' onClick={()=> setBuyShare(false)}>Sell</Button>
                        </ButtonGroup>

                        {buyShare? handleBuySection() : handleSellSection()}
                    </Segment>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column mobile={16} tablet={16} computer={10}>
                <Segment>
                    
                    <Grid>
                        <Grid.Row columns={2}>
                            <Grid.Column>

                                <Grid.Row textAlign="center">
                                <Header as="h3">Open: <span>{open}</span>
                                </Header>
                                </Grid.Row>

                                <Grid.Row textAlign="center">
                                <Header as="h3">Close: <span>{close}</span>
                                </Header>
                                </Grid.Row>

                                <Grid.Row textAlign="center">
                                <Header as="h3">High: <span>{high}</span>
                                </Header>
                                </Grid.Row>

                                <Grid.Row textAlign="center">
                                <Header as="h3">Low: <span>{low}</span>
                                </Header>
                                </Grid.Row>
                            </Grid.Column>

                            <Grid.Column>
                                <Grid.Row textAlign="center">
                                <Header as="h3">52-week high: <span>{high52}</span>
                                </Header>
                                </Grid.Row>

                                <Grid.Row textAlign="center">
                                <Header as="h3">52-week low: <span>{low52}</span>
                                </Header>
                                </Grid.Row>

                                <Grid.Row textAlign="center">
                                <Header as="h3">Volume: <span>{volume}</span>
                                </Header>
                                </Grid.Row>

                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    
                </Segment>
                </Grid.Column>
                
            </Grid.Row>
        </Grid>
    );
}

export default Stock;

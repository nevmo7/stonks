import React, { useEffect, useState } from "react";
import { Input, Button, Grid, Header, Search, Segment, Table, TableHeaderCell } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import News from "./News";
import SearchStock from "./StockSearch";
import Positions from "./Positions";

export default function HomePage(props) {

    const[availableFunds, setAvailablefunds] = useState(0);
    const[portfolioValue, setPortfolioValue] = useState(0);
    const[portfolioReturn, setPortfolioReturn] = useState(0);
    const[positions, setPositions] = useState([]);
    const[topGainer, setTopGainer] = useState([]);
    const[topLoser, setTopLoser] = useState([]);

    useEffect(() => {
        getGainers();
        getLosers();
        getPortfolio();
        getBuyingPower();
        
    }, []);

    function getBuyingPower(){
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json"},
        };
        fetch("/api/get_funds", requestOptions).then((response) => response.json())
        .then((data) => {
            if(data.Success){
                setAvailablefunds(data.Success);
            }
        });
    }
    function getGainers(){
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json"},
        };
        fetch("/stock-api/get-top-gainers", requestOptions).then((response) => response.json())
        .then((data) => {
            setTopGainer(data.slice(0,10));
        });
    }

    function getLosers(){
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json"},
        };
        fetch("/stock-api/get-top-losers", requestOptions).then((response) => response.json())
        .then((data) => {
            if(data){
                setTopLoser(data.slice(0,10));
            }
        });
    }

    function getPortfolio(){
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json"},
        };
        fetch("/api/get_positions", requestOptions).then((response) => response.json())
        .then((data) => {
            if(data.portfolioValue){
                setPortfolioValue(data.portfolioValue);
                setPortfolioReturn(data.portfolioReturn);
                setPositions(data.positions);
                console.log(data.positions);
            }
        });
    }

    function renderPositions(){
        const stockList = [];
        Array.from(positions).forEach((stock) => {
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
                    <Table.Cell textAlign="right">{stock.avgPrice}</Table.Cell>
                    <Table.Cell textAlign="right">{stock.units}</Table.Cell>
                    <Table.Cell textAlign="right">{stock.price}</Table.Cell>
                    <Table.Cell textAlign="right"><span style={{color: negativeChange? "red": "green"}}>{stock.change}</span></Table.Cell>
                    <Table.Cell textAlign="right"><span style={{color: negativeChange? "red": "green"}}>{stock.changePercent}%</span></Table.Cell>
                    <Table.Cell textAlign="right"><span style={{color: negativeChange? "red": "green"}}>{stock.return}</span></Table.Cell>
                    <Table.Cell textAlign="right">{stock.totalValue}</Table.Cell>
                </Table.Row>)
       });
       
       return stockList;
    }

    function renderGainerList(){
        const gainerList = [];
        Array.from(topGainer).forEach((gainer) => {
            
                gainerList.push(
                    <Table.Row>
                    <Table.Cell collapsing>
                        <Link to={"./stock/" + gainer.ticker}>{gainer.ticker}</Link>
                    </Table.Cell>
    
                    <Table.Cell>
                        {gainer.companyName}
                    </Table.Cell>
                    
                    <Table.Cell collapsing>
                        {gainer.price}
                    </Table.Cell>
    
                    <Table.Cell collapsing textAlign='right'>
                        <span style={{color: "green"}}>
                            {gainer.changesPercentage}%
                        </span>
                    </Table.Cell>
                </Table.Row>)
            
       });
       
       return gainerList;
    }

    function renderLoserList(){
        const loserList = [];
        Array.from(topLoser).forEach((gainer) => {
            loserList.push(
                <Table.Row>
                <Table.Cell collapsing>
                    <Link to={"./stock/" + gainer.ticker}>{gainer.ticker}</Link>
                </Table.Cell>

                <Table.Cell>
                    {gainer.companyName}
                </Table.Cell>
                
                <Table.Cell collapsing>
                    {gainer.price}
                </Table.Cell>

                <Table.Cell collapsing textAlign='right'>
                    <span style={{color: "red"}}>
                        {gainer.changesPercentage}%
                    </span>
                </Table.Cell>
            </Table.Row>)
       });
       
       return loserList;
    }
    
    return(
        <Grid stackable>
            <Grid.Row centered>
                <SearchStock/>
            </Grid.Row>

            <Grid.Row stretched columns={2}>
                
                <Grid.Column mobile={16} tablet={16} computer={6}>
                    <Segment>
                    <Header.Subheader style={{margin: 10}}>
                        Market opens in
                        <Header as="h1">
                            53:40
                        </Header>
                    </Header.Subheader>

                    <Header.Subheader style={{margin: 10}}>
                        Portfolio Value 
                        <Header style={{color: portfolioReturn < 1? "red": "green"}} as="h1">${portfolioValue}
                        <span style={{fontSize:15, color: portfolioReturn < 1? "red": "green"}}>({portfolioReturn})</span>
                        </Header>
                    </Header.Subheader>

                    <Header.Subheader style={{margin: 10}}>
                        Available Funds 
                        <Header as="h1">${availableFunds}
                        </Header>
                    </Header.Subheader>
                    </Segment>
                </Grid.Column>

                <Grid.Column mobile={16} tablet={16} computer={10}>
                <Segment>
                    <Header as="h5">
                        Open Positions
                    </Header>
                    <Table basic='very' selectable>
                        <Table.Header>
                            <Table.HeaderCell>Ticker</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell textAlign="right">Avg. Price</Table.HeaderCell>
                            <Table.HeaderCell textAlign="right">Units</Table.HeaderCell>
                            <Table.HeaderCell textAlign="right">Price</Table.HeaderCell>
                            <Table.HeaderCell textAlign="right">Change</Table.HeaderCell>
                            <Table.HeaderCell textAlign="right">Change %</Table.HeaderCell>
                            <Table.HeaderCell textAlign="right">Return</Table.HeaderCell>
                            <Table.HeaderCell textAlign="right">Value</Table.HeaderCell>
                            
                        </Table.Header>
                        <Table.Body>
                            {renderPositions()}
                        </Table.Body>

                    </Table>
                </Segment>
                </Grid.Column>
                
            </Grid.Row>
            
        <Grid.Row columns={3}>
            <Grid.Column width={5}>
                <Table>
                    <Table.Header>
                        <Table.HeaderCell colSpan="2">Top Gainers</Table.HeaderCell>
                        <Table.HeaderCell colSpan="2" textAlign="right"><Link to="./ranking"> See More</Link></Table.HeaderCell>
                    </Table.Header>
                    <Table.Body>
                    {renderGainerList()}
                    </Table.Body>
                </Table>
            </Grid.Column>

            <Grid.Column width={5}>
            <Table>
                <Table.Header>
                    <Table.HeaderCell colSpan="2">Top Losers</Table.HeaderCell>
                    <Table.HeaderCell colSpan="2" textAlign="right"><Link to="./ranking"> See More</Link></Table.HeaderCell>
                </Table.Header>
                <Table.Body>
                {renderLoserList()}
                </Table.Body>
            </Table>
            </Grid.Column>
            
            <Grid.Column width={6}>
            <News/>
            </Grid.Column>
        </Grid.Row>
        </Grid>
    );

}

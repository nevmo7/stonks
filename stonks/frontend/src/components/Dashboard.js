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

    useEffect(() => {
        getBuyingPower();
        getPortfolio();
    }, []);

    function getBuyingPower(){
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json"},
        };
        fetch("/api/get_funds", requestOptions).then((response) => response.json())
        .then((data) => {
            if(data.Success){
                console.log(data.Success);
                setAvailablefunds(data.Success);
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
                    <Table.Cell textAlign="right"><span style={{color: negativeChange? "red": "green"}}>{stock.totalValue}</span></Table.Cell>
                </Table.Row>)
       });
       
       return stockList;
    }
    
    return(
        <div>
            <Grid centered>
                <Grid.Row columns="1">
                    <SearchStock/>
                </Grid.Row>
            
            </Grid>
                
            <Header.Subheader style={{margin: 10}}>Portfolio Value 
                <Header style={{color: portfolioValue < 0? "red": "green"}} as="h1">${portfolioValue}
                <span style={{fontSize:15}}> {portfolioReturn}</span>
                </Header>
            </Header.Subheader>

            <Header.Subheader style={{margin: 10}}>Available Funds 
                <Header as="h1">${availableFunds}
                </Header>
            </Header.Subheader>
            <Segment>
            <Table basic='very' selectable>
                <Table.Header>
                    <Table.HeaderCell>Open positions</Table.HeaderCell>
                    
                </Table.Header>
                <Table.Body>
                    {renderPositions()}
                </Table.Body>

            </Table>
            </Segment>
            <News/>
        </div>
    );

}

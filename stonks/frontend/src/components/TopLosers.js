import React, { useEffect, useState } from "react";
import { Button , List, Header, Table} from 'semantic-ui-react';
import {Link} from 'react-router-dom'

function TopLosers(props){

    const[losers, setLosers] = useState({});

    useEffect(() =>{
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json"},
        };
        fetch("/stock-api/get-top-losers", requestOptions).then((response) => response.json())
        .then((data) => {
            setLosers(data);
        });
    }, [])

    function renderLoserList(){
        const gainerList = [];
        Array.from(losers).forEach((loser) => {
            gainerList.push(
                <Table.Row>
                    <Table.Cell collapsing>
                        <Link to={"./stock/" + loser.ticker}>{loser.ticker}</Link>
                    </Table.Cell>

                    <Table.Cell>
                        {loser.companyName}
                    </Table.Cell>
                    
                    <Table.Cell collapsing>
                        {loser.price}
                    </Table.Cell>

                    <Table.Cell collapsing textAlign='right'>
                        <span style={{color: "red"}}>
                            {loser.changesPercentage}%
                        </span>
                    </Table.Cell>
                </Table.Row>


            )
       });
       
       return gainerList;
    }

    return(
        <Table striped>
            <Table.Header>
            <Table.Row>
                <Table.HeaderCell colSpan='4'>Top Losers</Table.HeaderCell>
            </Table.Row>
            </Table.Header>
            {renderLoserList()}
        </Table>
    )
}

export default TopLosers;
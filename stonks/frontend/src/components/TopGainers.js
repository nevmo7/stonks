import React, { useEffect, useState } from "react";
import { Button , List, Header, Table} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

function TopGainers(props){

    const[gainers, setGainers] = useState({});

    useEffect(() =>{
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json"},
        };
        fetch("/stock-api/get-top-gainers", requestOptions).then((response) => response.json())
        .then((data) => {
            setGainers(data);
        });
    }, [])

    function renderGainerList(){
        const gainerList = [];
        Array.from(gainers).forEach((gainer) => {
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

    return(
        <Table divided>
            <Table.Header>
            <Table.Row>
                <Table.HeaderCell colSpan='4'>Top Gainers</Table.HeaderCell>
            </Table.Row>
            </Table.Header>
            {renderGainerList()}
        </Table>
    )
}

export default TopGainers;
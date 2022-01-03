import React, { useEffect, useState } from "react";
import { Grid, Header, Container, Tab} from 'semantic-ui-react';
import TopGainers from "./TopGainers";
import TopLosers from "./TopLosers";
 
function Ranking(props){
    const panes = [
        { menuItem: 'Gainers', render: () => <Tab.Pane><TopGainers/></Tab.Pane> },
        { menuItem: 'Losers', render: () => <Tab.Pane><TopLosers/></Tab.Pane> }
      ]
    return(
        <Grid textAlign="center" padded>
            <Grid.Row>
                <Header as='h1' icon>
                    Ranking
                    <Header.Subheader>
                    Top Gainers and Losers today
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

export default Ranking;
 
import React, { useEffect, useState } from "react";
import {BrowserRouter as Router, Route, Switch, useHistory} from "react-router-dom";
import { Button , Item, Label, Icon, Grid, Divider, Segment} from 'semantic-ui-react';

function News(props) {
    const paragraph = "This is a paragraph";
    
    
    return(

        <Grid stackable>
        <Grid.Row columns="2">
        <Grid.Column padded>
            <Segment>
        <Item.Group divided>
            <Item>
            <Item.Image src='https://dummyimage.com/600x400/000/fff' />

            <Item.Content>
                <Item.Header as='a'>12 Years a Slave</Item.Header>
                <Item.Meta>
                <span className='cinema'>Union Square 14</span>
                </Item.Meta>
                <Item.Description>{paragraph}</Item.Description>
                <Item.Extra>
                <Label>IMAX</Label>
                <Label icon='globe' content='Additional Languages' />
                </Item.Extra>
            </Item.Content>
            </Item>

            <Item>
            <Item.Image src='https://dummyimage.com/600x400/000/fff' />

            <Item.Content>
                <Item.Header as='a'>My Neighbor Totoro</Item.Header>
                <Item.Meta>
                <span className='cinema'>IFC Cinema</span>
                </Item.Meta>
                <Item.Description>{paragraph}</Item.Description>
                <Item.Extra>
                <Label>Limited</Label>
                </Item.Extra>
            </Item.Content>
            </Item>

            <Item>
            <Item.Image src='https://dummyimage.com/600x400/000/fff' />

            <Item.Content>
                <Item.Header as='a'>Watchmen</Item.Header>
                <Item.Meta>
                <span className='cinema'>IFC</span>
                </Item.Meta>
                <Item.Description>{paragraph}</Item.Description>
            </Item.Content>
            </Item>
        </Item.Group>
        </Segment>
        </Grid.Column>

        <Grid.Column padded>  
        <Segment>
        <Item.Group divided>
            <Item>
            <Item.Image src='https://dummyimage.com/600x400/000/fff' />

            <Item.Content>
                <Item.Header as='a'>12 Years a Slave</Item.Header>
                <Item.Meta>
                <span className='cinema'>Union Square 14</span>
                </Item.Meta>
                <Item.Description>{paragraph}</Item.Description>
                <Item.Extra>
                <Label>IMAX</Label>
                <Label icon='globe' content='Additional Languages' />
                </Item.Extra>
            </Item.Content>
            </Item>

            <Item>
            <Item.Image src='https://dummyimage.com/600x400/000/fff' />

            <Item.Content>
                <Item.Header as='a'>My Neighbor Totoro</Item.Header>
                <Item.Meta>
                <span className='cinema'>IFC Cinema</span>
                </Item.Meta>
                <Item.Description>{paragraph}</Item.Description>
                <Item.Extra>
                <Label>Limited</Label>
                </Item.Extra>
            </Item.Content>
            </Item>

            <Item>
            <Item.Image src='https://dummyimage.com/600x400/000/fff' />

            <Item.Content>
                <Item.Header as='a'>Watchmen</Item.Header>
                <Item.Meta>
                <span className='cinema'>IFC</span>
                </Item.Meta>
                <Item.Description>{paragraph}</Item.Description>
            </Item.Content>
            </Item>
        </Item.Group>
        </Segment>
        </Grid.Column>
        </Grid.Row>

        </Grid>
    );
}

export default News;
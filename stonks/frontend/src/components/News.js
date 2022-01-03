import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { Button , Item, Label, Icon, Grid, Divider, Segment, Container, Header} from 'semantic-ui-react';
import TopGainers from './TopGainers';
import TopLosers from "./TopLosers";

function News(props) {
    
    const[articles, setArticles] = useState([]);

    useEffect(() => {
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json"},
        };
        fetch("/stock-api/get-news-highlights", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setArticles(data);
            });
    }, []);

    function renderNews(){
        const newsList = [];
        Array.from(articles).forEach((article) => {
            newsList.push(<Item>
            <Item.Image src={article.urlToImage} />

            <Item.Content>
                <Item.Header as='a'><a href={article.url} target="_blank">{article.title}</a></Item.Header>
                <Item.Meta>
                <span>{article.source.name}</span>
                </Item.Meta>
                <Item.Description>{article.description}</Item.Description>
                <Item.Extra>
                <Label>{article.publishedAt}</Label>
                </Item.Extra>
            </Item.Content>
            </Item>)
       });
       
       return newsList;
    }

    return(
        <Grid>
            <Grid.Row columns="1">
                <Grid.Column>
                    <Segment style={{overflow: 'auto', maxHeight: 475 }}>
                    <Header as="h2">
                        News Highlights
                    </Header>
                    <Divider clearing />
                    <Item.Group divided>
                        { renderNews() }
                    </Item.Group>
                    </Segment>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}

export default News;
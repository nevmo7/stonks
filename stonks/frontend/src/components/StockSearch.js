import React, { useEffect, useState } from "react";
import {Search, Label } from 'semantic-ui-react';

export default function SearchStock(props) {

    const[loading, setLoading] = useState(false);
    const[searchResult, setSearchResult] = useState([]);
    const resultRenderer = ({ name, symbol }) => <div><p>{name}</p><Label content={symbol} /></div>

    async function search(key){
        if(key !== ""){
            const requestOptions = {
                method: "GET",
                headers: { "Content-Type": "application/json"},
            };
        
            console.log(key);
            setLoading(true)
            let result = await fetch("../stock-api/search/" + key, requestOptions);
            result = await result.json();

            setSearchResult(result);
            setLoading(false)
        }
        

    }
    
    return(
        <Search 
            placeholder="Search symbol"
            loading={loading}
            onResultSelect={(e, data) => {
                    if(window.location.pathname.includes("stock"))
                        window.location.href = "./"+data.result.symbol
                    else
                        window.location.href = "./stock/"+data.result.symbol
                }
            }
            onSearchChange={(e) => search(e.target.value)}
            results={searchResult}
            resultRenderer={resultRenderer}
        />
            
    );

}

import React, {useState, useEffect} from "react";

function Positions(props) {

    useEffect(() => {
        console.log(props.positionData);
    }, [])

    return(
        <h1>Positions</h1>
    );
}

export default Positions;
import React from "react";

function Logo({width = '10px'}) {
    return (
        <img 
            className="h-10 w-auto items-center" 
            src="/logo.svg" 
            alt="Report-Relay" 
            height="auto"
            style={{width}}
        />
    )
}

export default Logo
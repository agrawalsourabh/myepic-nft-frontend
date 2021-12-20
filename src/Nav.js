import React from "react";

import Button from "./Button";

import './Nav.css';

class Nav extends React.Component{

    renderButton = (walletStatus, onClickHandler) => {
        let msg = "";
        if(walletStatus){
            msg = "Change Address!";
        }
        else{
            msg = "Connect your wallet!";
        }

        return(
            <Button text={msg} onClick={onClickHandler}/>
        );
    }

    render(){
        const {onClickHandler, walletConnectionStatus} = this.props;
        return(
            <nav>
                <div className="logo">
                    <h2> Epic NFTs</h2>
                </div>
                <ul className="nav-links">
                    <li className="nav-items">
                        {this.renderButton(walletConnectionStatus, onClickHandler)}
                    </li>
                </ul>   
            </nav>
        );
    }
}

export default Nav;
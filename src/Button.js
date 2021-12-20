import React from "react";
import './Button.css';

class Button extends React.Component{
    render(){
        const {text, onClick} = this.props;
        return(
            <div className="btn grow">
                <a className="f6 tc dib tc white" href="#0" onClick={onClick}>{text}</a>
            </div>
        );
    }
}

export default Button;
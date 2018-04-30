import React, { Component, Fragment } from 'react';

class Main extends Component {
    
    constructor(props){
        super(props);

        this.defaultMessage = props.message;
    }

    render() {

        const { message } = this.props;

        const responseMessage = message.length ? message : this.defaultMessage;

        return(
            <Fragment>
                <p>{ responseMessage }</p>
                <input  type     = "text"
                        onChange = { this.handleChange }/>
            </Fragment>
        );
    }

    handleChange = (e) => {
        const { changeMessage } = this.props;
        const newMessage = e.target.value;

        changeMessage(newMessage);
    }

}

export default Main;
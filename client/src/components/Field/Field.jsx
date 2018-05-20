import React, { Component } from 'react';

import CSSModules from 'react-css-modules';

import styles from './style.scss';

class Field extends Component {

    render() {
        if (this.props.game) {
            console.log(this.props.game);
            this.field = this.props.game.field;
            this.counter = 0;

            return(
                <div className="field-container">
                    { this.renderField(3, 3) }
                </div>
            );
        } else 
            return null;
    }

    renderField(rowCount, colCount){
        let rows = [];

        for(let i = 0; i < rowCount; i++){
            rows.push(<div key={ i } className="field-row">
                { this.renderCol(colCount) }   
            </div>)
        }

        return rows;
    }

    renderCol(colCount){
        let cols = [];

        for(let i = 0; i < colCount; i++){
            cols.push(<div  data-id = { this.counter }
                            onClick = { (e) => this.props.handleFieldClick(e.target.dataset.id) }
                            key={this.counter}
                            className=
                            {`field-col${ this.getShape() }`}></div>)
        }

        return cols;
    }

    getShape() {
        let result = this.field[this.counter] !== null ? this.field[this.counter] ? " o" : " x" : "";
        this.counter++;
        return result;
    }
}

export default CSSModules(Field, styles);